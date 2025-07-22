import chalk from 'chalk';

import {
    createIfNotExists,
    initializeProject,
    saveCliMetadata,
} from '../../core/index.js';
import { resolveFolderConflict } from '../../utils/resolveFolderConflict.js';

export const createStructureModular = async (answers) => {
    const result = await resolveFolderConflict(answers.safeName);

    if (result.canceled) return false;

    answers.safeName = result.safeName;
    const paths = result.paths;

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
