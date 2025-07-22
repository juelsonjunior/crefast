import chalk from 'chalk';

import {
    defineProjectPaths,
    createIfNotExists,
    initializeProject,
} from '../../utils/index.js';
import { saveCliMetadata } from '../cliMetadata.js';
import { resolverFolderConflict } from '../../utils/resolverFolderConflict.js';
import { checkIfExist } from '../checkIfExists.js';

export const createStructureMvc = async (answers) => {
    let safeName = answers.safeName;
    let paths = defineProjectPaths(safeName);
    const exits = await checkIfExist(paths.dir);

    if (exits) {
        const result = await resolverFolderConflict(paths.dir, safeName);
        if (result.action == 'cancel') return false;
        if (result.action == 'rename') {
            answers.safeName = result.newName;
            safeName = result.newName;
            paths = defineProjectPaths(safeName);
        }
    }

    try {
        await createIfNotExists(paths.modelsPath, 'dir');
        await createIfNotExists(paths.viewsPath, 'dir');
        await createIfNotExists(paths.controllersPath, 'dir');
        await createIfNotExists(paths.routesPath, 'dir');
        await createIfNotExists(paths.configPath, 'dir');
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
        await saveCliMetadata(paths.dir, 'mvc');
        return true;
    } catch (err) {
        console.error(
            chalk.red('❌ Erro ao criar a estrutura REST', err.message)
        );
        return false;
    }
};
