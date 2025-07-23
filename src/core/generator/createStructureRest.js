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
                label: `Criando pasta ${name}`,
                action: async ({ paths }) => {
                    const foldePath = paths[`${name}Path`];
                    await createIfNotExists(foldePath);
                    await createFromTemplate(
                        resolvePathTemplate(`rest/${name}`, template),
                        `${foldePath}/${fileName}`
                    );
                },
            })),
            {
                label: 'Criando arquivo app.js',
                action: async ({ paths }) => {
                    await createFromTemplate(
                        resolvePathTemplate('rest/', 'app.ejs'),
                        paths.appPath
                    );
                },
            },
            {
                label: 'Criando arquivo server.js',
                action: async ({ paths }) => {
                    await createFromTemplate(
                        resolvePathTemplate('rest/', 'server.ejs'),
                        paths.serverPath
                    );
                },
            },
            {
                label: 'Criando arquivo README.md',
                action: async ({ paths }) => {
                    await createFromTemplate(
                        resolvePathTemplate('rest/', 'README.ejs'),
                        paths.readmePath,
                        { projectName: answers.safeName }
                    );
                },
            },
        ];

        await structureBuilder(steps, { paths, answers });
        await structureBuilder(
            [
                {
                    label: 'Salvando metadados do projeto',
                    action: async ({ paths, answers }) => {
                        await saveCliMetadata(paths.dir, answers);
                    },
                },
            ],
            { paths, answers }
        );
        await initializeProject(paths.dir, paths.serverPath, answers);

        return true;
    } catch (err) {
        errorHandler('Erro ao criar a estrutura REST', err);
        return false;
    }
};
