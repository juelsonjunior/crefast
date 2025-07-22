import chalk from 'chalk';

import {
    createIfNotExists,
    initializeProject,
    saveCliMetadata,
} from '../../core/index.js';
import {
    runWithSpinner,
    resolveFolderConflict,
    createFromTemplate,
} from '../../utils/index.js';
import { resolvePathTemplate } from '../../utils/resolvePath.js';

export const createStructureREST = async (answers) => {
    const { safeName, canceled, paths } = await resolveFolderConflict(
        answers.safeName
    );

    if (canceled) return false;
    answers.safeName = safeName;

    try {
        await runWithSpinner('Criando pasta controllers', async () => {
            await createIfNotExists(paths.controllersPath);
            await createFromTemplate(
                resolvePathTemplate('rest/controllers', 'baseController.ejs'),
                `${paths.controllersPath}/baseController.js`
            );
        });

        await runWithSpinner('Criando pasta routes', async () => {
            await createIfNotExists(paths.routesPath);
            await createFromTemplate(
                resolvePathTemplate('rest/routes', 'baseRoute.ejs'),
                `${paths.routesPath}/baseRoute.js`
            );
        });
        await runWithSpinner('Criando arquivo app.js', async () => {
            await createFromTemplate(
                resolvePathTemplate('rest/', 'app.ejs'),
                paths.appPath
            );
        });
        await runWithSpinner('Criando arquivo server.js', async () => {
            await createFromTemplate(
                resolvePathTemplate('rest/', 'server.ejs'),
                paths.serverPath
            );
        });
        await runWithSpinner('Criando README.md', async () => {
            await createFromTemplate(
                resolvePathTemplate('rest/', 'README.ejs'),
                paths.readmePath,
                { projectName: answers.safeName }
            );
        });

        await initializeProject(paths.dir, answers);

        await runWithSpinner('Salvando metadados do projeto', async () => {
            await saveCliMetadata(paths.dir, answers);
        });

        return true;
    } catch (err) {
        console.error(
            chalk.red('❌ Erro ao criar a estrutura REST', err.message)
        );
        return false;
    }
};
