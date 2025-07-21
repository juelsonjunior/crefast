import chalk from 'chalk';

import { defineProjectPaths } from './defineProjectPaths.js';
import { createIfNotExists } from './createIfNotExists.js';
import { initializeProject } from './initializeProject.js';

export const createStrutureREST = async (answers) => {
    const {
        dir, 
        controllersPath,
        routesPath,
        appPath,
        serverPath,
        gitIgnorePath,
        readmePath,
    } = defineProjectPaths(answers.projectName);

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
        await createIfNotExists(gitIgnorePath, 'file', `node_modules/\n.env`);
        await createIfNotExists(
            readmePath,
            `# ${answers.projectName}\n README montado na minha CLI`
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
