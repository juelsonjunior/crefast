import chalk from 'chalk';

import {
    checkIfExist,
    defineProjectPaths,
    createIfNotExists,
    initializeProject,
    saveCliMetadata,
    askConflictPrompt,
    actionOverwrite,
    askNewNamePrompt,
} from '../../core/index.js';

export const createStructureModular = async (answers) => {
    let safeName = answers.safeName;
    let paths = defineProjectPaths(safeName);
    const exits = await checkIfExist(paths.dir);

    if (exits) {
        const action = await askConflictPrompt(safeName);

        if (action.action == 'cancel') return false;

        if (action.action == 'rename') {
            const { newName } = askNewNamePrompt();
            answers.safeName = newName;
            safeName = newName;
            paths = defineProjectPaths(safeName);
        }

        if (action == 'overwrite') {
            await actionOverwrite(action, paths.dir);
        }
    }

    try {
        await createIfNotExists(paths.controllersPath, 'dir');
        await createIfNotExists(paths.servicesPath, 'dir');
        await createIfNotExists(paths.repositoriesPath, 'dir');
        await createIfNotExists(paths.modelsPath, 'dir');
        await createIfNotExists(paths.routesPath, 'dir');
        await createIfNotExists(
            paths.appPath,
            'file',
            `console.log("APP construido")`
        );
        await createIfNotExists(
            paths.serverPath,
            'file',
            `console.log("SERVER construido")`
        );
        await createIfNotExists(
            paths.readmePath,
            `# ${answers.safeName}\n README montado na minha CLI`
        );
        await initializeProject(paths.dir, answers);
        await saveCliMetadata(paths.dir, 'modular');
        return true;
    } catch (err) {
        console.error(
            chalk.red('❌ Erro ao criar a estrutura Modular', err.message)
        );
        return false;
    }
};
