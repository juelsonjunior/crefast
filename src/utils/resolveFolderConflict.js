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
import { t } from '../i18n/index.js';

export const resolveFolderConflict = async (safeName, maxRetries = 3) => {
    let currentName = safeName;
    let paths = defineProjectPaths(currentName);
    let attempts = 0;

    try {
        while (await checkIfExist(paths.dir)) {
            if (attempts > maxRetries) {
                console.error(chalk.red(`❌ ${t('error.max.attempts')}`));
                return { canceled: true };
            }

            const action = await askConflictPrompt(currentName);

            if (action == 'cancel') {
                console.log(chalk.yellow(`⚠️ ${t('error.creation.cancel')}`));
                return { canceled: true };
            }

            if (action == 'rename') {
                const { newName } = await askNewNamePrompt();
                if (newName == currentName) {
                    console.log(
                        chalk.yellow(`⚠️ ${t('error.creation.repeat_name')}`)
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
                    t('error.creation.remove_directory'),
                    async () => {
                        await actionOverwrite(paths.dir);
                    }
                );
                break;
            }
        }

        return { safeName: currentName, paths };
    } catch (err) {
        errorHandler(t('error.catch.conflict'), err);
        return { canceled: true };
    }
};
