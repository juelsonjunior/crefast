import chalk from 'chalk';
import {
    checkIfExist,
    defineProjectPaths,
    askConflictPrompt,
    actionOverwrite,
    askNewNamePrompt,
} from '../core/index.js';
import { runWithSpinner } from './runWithSpinner.js';
import { errorHandler } from './errorHandler.js';

export const resolveFolderConflict = async (safeName, maxRetries = 3) => {
    let currentName = safeName;
    let paths = defineProjectPaths(currentName);
    let attempts = 0;
    
    try {
        while (await checkIfExist(paths.dir)) {
            if (attempts > maxRetries) {
                throw new Error('attempt_exceeded');
            }

            const action = await askConflictPrompt(currentName);

            if (action == 'cancel') {
                throw new Error('canceled_by_user');
            }

            if (action == 'rename') {
                const { newName } = await askNewNamePrompt();
                currentName = newName;
                paths = defineProjectPaths(currentName);
                attempts++;
                continue;
            }

            if (action == 'overwrite') {
                await runWithSpinner(
                    'Apagando diretório existente',
                    async () => {
                        await actionOverwrite(paths.dir);
                    }
                );
                break;
            }
        }

        return { safeName: currentName, paths };
    } catch (err) {
        if (err.message == 'attempt_exceeded') {
            console.log(
                chalk.yellow('⚠️ Criação de projeto cancelada pelo usuário.')
            );
        } else if (err.message == 'canceled_by_user') {
            console.log(
                chalk.red(
                    '❌ Número máximo de tentativas de renomeação atingido.'
                )
            );
        } else {
            errorHandler('Erro ao resolver conflito de pastas', err);
        }
        return { canceled: true };
    }
};
