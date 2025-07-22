import chalk from 'chalk';

import {
    createIfNotExists,
    initializeProject,
    saveCliMetadata,
} from '../../core/index.js';
import { runWithSpinner } from '../../utils/runWithSpinner.js';
import { resolveFolderConflict } from '../../utils/resolveFolderConflict.js';

export const createStructureREST = async (answers) => {
    const { safeName, canceled, paths } = await resolveFolderConflict(
        answers.safeName
    );

    if (canceled) return false;

    answers.safeName = safeName;

    try {
        await runWithSpinner('Criando pasta controllers', async () => {
            await createIfNotExists(paths.controllersPath, 'dir');
        });

        await runWithSpinner('Criando pasta route', async () => {
            await createIfNotExists(paths.routesPath, 'dir');
        });
        await runWithSpinner('Criando arquivo app.js', async () => {
            await createIfNotExists(
                paths.appPath,
                'file',
                `console.log("APP construido")`
            );
        });
        await runWithSpinner('Criando arquivo server.js', async () => {
            await createIfNotExists(
                paths.serverPath,
                'file',
                `console.log("SERVER construido")`
            );
        });
        await runWithSpinner('Criando README.md', async () => {
            await createIfNotExists(
                paths.readmePath,
                `# ${answers.safeName}\n README montado na minha CLI`
            );
        });

        await initializeProject(paths.dir, answers);

        await runWithSpinner('Salvando metadados do projeto', async () => {
            await saveCliMetadata(paths.dir, 'rest');
        });

        return true;
    } catch (err) {
        console.error(
            chalk.red('❌ Erro ao criar a estrutura REST', err.message)
        );
        return false;
    }
};
