import chalk from 'chalk';

import { createIfNotExists } from './createIfNotExists';
import { defineProjectPaths } from './defineProjectPaths';

export const strutureMvc = async (answers) => {
    const {
        modelsPath,
        viewsPath,
        controllersPath,
        routesPath,
        configPath,
        appPath,
        serverPath,
        gitIgnorePath,
        readmePath,
    } = defineProjectPaths(answers.projetName);
    
    try {
        await createIfNotExists(modelsPath);
        await createIfNotExists(viewsPath);
        await createIfNotExists(controllersPath);
        await createIfNotExists(routesPath);
        await createIfNotExists(configPath);
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
