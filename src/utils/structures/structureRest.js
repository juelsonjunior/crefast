import chalk from 'chalk';

import {
    defineProjectPaths,
    createIfNotExists,
    initializeProject,
} from '../index.js';

export const structureREST = async (answers) => {
    const {
        dir,
        controllersPath,
        routesPath,
        appPath,
        serverPath,
        //gitIgnorePath,
        readmePath,
    } = defineProjectPaths(answers.safeName);

    try {
        await createIfNotExists(controllersPath, 'dir');
        await createIfNotExists(routesPath, 'dir');
        await createIfNotExists(
            appPath,
            'file',
            `console.log("APP construido")`
        );
        await createIfNotExists(
            serverPath,
            'file',
            `console.log("SERVER construido")`
        );
        //await createIfNotExists(gitIgnorePath, 'file', `node_modules/\n.env`);
        await createIfNotExists(
            readmePath,
            `# ${answers.safeName}\n README montado na minha CLI`
        );
        await initializeProject(dir, answers);
        return true;
    } catch (err) {
        console.error(
            chalk.red('❌ Erro ao criar a estrutura REST', err.message)
        );
        return false;
    }
};

