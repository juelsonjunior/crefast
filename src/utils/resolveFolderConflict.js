import chalk from 'chalk';
import {
    checkIfExist,
    defineProjectPaths,
    askConflictPrompt,
    actionOverwrite,
    askNewNamePrompt,
} from '../core/index.js';
import { runWithSpinner } from './runWithSpinner.js';

export const resolveFolderConflict = async (safeName, maxRetries = 3) => {
    let currentName = safeName;
    let paths = defineProjectPaths(currentName);
    let attempts = 0;

    while (await checkIfExist(paths.dir)) {
        if (attempts > maxRetries) {
            console.log(
                chalk.red(
                    `🚫 Número máximo de tentativas de renomeação atingido.`
                )
            );
            return { canceled: true };
        }

        const action = await askConflictPrompt(currentName);

        if (action == 'cancel') {
            console.log(
                chalk.yellow('⚠️ Criação de projeto cancelada pelo usuário.')
            );
            return { canceled: true };
        }

        if (action == 'rename') {
            const { newName } = await askNewNamePrompt();
            currentName = newName;
            paths = defineProjectPaths(currentName);
            attempts++;
            continue;
        }

        if (action == 'overwrite') {
            await runWithSpinner('Apagando diretório existente', async () => {
                await actionOverwrite(paths.dir);
            });
            break;
        }
    }

    return { safeName: currentName, paths };
};
