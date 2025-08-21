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
                console.error(
                    chalk.red('❌ Número máximo de tentativas atingido.')
                );
                return { canceled: true };
            }

            const action = await askConflictPrompt(currentName);

            if (action == 'cancel') {
                console.log(
                    chalk.yellow(
                        '⚠️ Criação de projeto cancelada pelo usuário.'
                    )
                );
                return { canceled: true };
            }

            if (action == 'rename') {
                const { newName } = await askNewNamePrompt();
                if (newName == currentName) {
                    console.log(
                        chalk.yellow(
                            '⚠️ Você digitou o mesmo nome. Nenhuma mudança feita.'
                        )
                    );
                    continue;
                }
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
        errorHandler('Erro ao resolver conflito de pastas', err);
        return { canceled: true };
    }
};
