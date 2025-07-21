import chalk from 'chalk';

import { createIfNotExists } from './createIfNotExists';
import { defineProjectPaths } from './defineProjectPaths';
import { initializeProject } from './initializeProject';

export const strutureMvc = async (answers) => {
    const {
        dir,
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
        await createIfNotExists(modelsPath, 'dir');
        await createIfNotExists(viewsPath, 'dir');
        await createIfNotExists(controllersPath, 'dir');
        await createIfNotExists(routesPath, 'dir');
        await createIfNotExists(configPath, 'dir');
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
