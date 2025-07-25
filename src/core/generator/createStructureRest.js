import fs from 'fs/promises';

import {
    createIfNotExists,
    initializeProject,
    saveCliMetadata,
} from '../../core/index.js';
import {
    createFromTemplate,
    resolvePathTemplate,
    errorHandler,
    resolveFolderConflict,
} from '../../utils/index.js';
import { structureBuilder } from './structureBuilder.js';

export const createStructureREST = async (answers) => {
    try {
        const { safeName, canceled, paths } = await resolveFolderConflict(
            answers.safeName
        );

        if (canceled) return false;
        answers.safeName = safeName;

        // Garante que a pasta raiz do projeto existe
        await fs.mkdir(paths.dir, { recursive: true });

        const folders = [
            {
                name: 'controllers',
                template: 'baseController.ejs',
                fileName: 'baseController.js',
            },
            {
                name: 'routes',
                template: 'baseRoute.ejs',
                fileName: 'baseRoute.js',
            },
        ];

        const steps = [
            ...folders.map(({ name, template, fileName }) => ({
                label: '',
                action: async ({ paths }) => {
                    const foldePath = paths[`${name}Path`];
                    await createIfNotExists(foldePath);
                    await createFromTemplate(
                        resolvePathTemplate(`rest/${name}`, template),
                        `${foldePath}/${fileName}`
                    );
                    return `${foldePath}/${fileName}`;
                },
            })),
            {
                label: '',
                action: async ({ paths }) => {
                    await createFromTemplate(
                        resolvePathTemplate('rest/', 'app.ejs'),
                        paths.appPath
                    );
                    return paths.appPath;
                },
            },
            {
                label: '',
                action: async ({ paths }) => {
                    await createFromTemplate(
                        resolvePathTemplate('rest/', 'server.ejs'),
                        paths.serverPath
                    );
                    return paths.serverPath;
                },
            },
            {
                label: '',
                action: async ({ paths }) => {
                    await createFromTemplate(
                        resolvePathTemplate('', 'README.ejs'),
                        paths.readmePath,
                        { projectName: answers.safeName }
                    );
                    return paths.readmePath;
                },
            },
            {
                label: '',
                action: async ({ paths }) => {
                    await createFromTemplate(
                        resolvePathTemplate('', '.gitignore.ejs'),
                        paths.gitIgnorePath
                    );
                    return paths.gitIgnorePath;
                },
            },
            {
                label: '',
                action: async ({ paths }) => {
                    await createFromTemplate(
                        resolvePathTemplate('', '.prettier.ejs'),
                        paths.prettierPath
                    );
                    return paths.prettierPath;
                },
            },
            {
                label: '',
                action: async ({ paths }) => {
                    await createFromTemplate(
                        resolvePathTemplate('', 'eslintConfig.ejs'),
                        paths.eslintPath
                    );
                    return paths.eslintPath;
                },
            },
            {
                label: '',
                action: async ({ paths }) => {
                    await createFromTemplate(
                        resolvePathTemplate('', '.env.ejs'),
                        paths.envPath
                    );
                    return paths.envPath;
                },
            },
            {
                label: '',
                action: async ({ paths }) => {
                    await createFromTemplate(
                        resolvePathTemplate('', '.envExemple.ejs'),
                        paths.envExemplePath
                    );
                    return paths.envExemplePath;
                },
            },
            {
                label: '',
                action: async ({ paths, answers }) => {
                    const metadataPath = await saveCliMetadata(
                        paths.dir,
                        answers
                    );
                    return metadataPath;
                },
            },
        ];

        console.log();
        await structureBuilder(steps, { paths, answers });
        console.log();
        await initializeProject(paths.dir, paths.serverPath, answers);

        return true;
    } catch (err) {
        errorHandler('Erro ao criar a estrutura REST', err);
        return false;
    }
};
