import {
    checkIfExist,
    defineProjectPaths,
    askConflictPrompt,
    actionOverwrite,
    askNewNamePrompt,
} from '../core/index.js';
import { runWithSpinner } from './runWithSpinner.js';

export const resolveFolderConflict = async (safeName) => {
    let currentName = safeName;
    let paths = defineProjectPaths(currentName);

    const exits = await checkIfExist(paths.dir);
    if (!exits) return { safeName: currentName, paths };

    const action = await askConflictPrompt(currentName);

    if (action == 'cancel') return { canceled: true };

    if (action == 'rename') {
        const { newName } = await askNewNamePrompt();
        return await resolveFolderConflict(newName)
    }

    if (action == 'overwrite') {
        await runWithSpinner('Apagando diretório existente', async () => {
            await actionOverwrite(paths.dir);
        });
    }

    return { safeName: currentName, paths };
};
