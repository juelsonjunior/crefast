import chalk from 'chalk';

import { defineProjectPaths } from './defineProjectPaths.js';
import { createIfNotExists } from './createIfNotExists.js';

export const createStrutureREST = async (answers) => {
    const {
        controllersPath,
        routesPath,
        appPath,
        serverPath,
        gitIgnorePath,
        readmePath,
    } = defineProjectPaths(answers.projectName);
    
    try {
        await createIfNotExists(controllersPath);
        await createIfNotExists(routesPath);
        await createIfNotExists(appPath, `console.log("APP construido")`);
        await createIfNotExists(serverPath, `console.log("SERVER construido")`);
        await createIfNotExists(gitIgnorePath, `node_modules/\n.env`);
        await createIfNotExists(
            readmePath,
            `# ${answers.projectName}\n README montado na minha CLI`
        );
        return true;
    } catch (err) {
        console.log(
            chalk.red('❌ Erro ao criar a estrutura REST', err.message)
        );
        return false;
    }
};
