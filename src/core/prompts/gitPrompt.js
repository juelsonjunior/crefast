import inquirer from 'inquirer';
import { t } from '../../i18n/index.js';

export const gitPrompt = async (gitOptions) => {
    console.log('gitPrompt recebendo:', gitOptions);
    if (gitOptions !== undefined) {
        return gitOptions;
    }

    const { use_git } = await inquirer.prompt({
        type: 'confirm',
        name: 'use_git',
        message: t('prompt.git')
    });

    return use_git;
};
