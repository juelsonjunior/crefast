import inquirer from 'inquirer';
import { t } from '../../i18n/index.js';

export const gitPrompt = async (gitOptions) => {
    const { use_git } = await inquirer.prompt({
        type: 'confirm',
        name: 'use_git',
        message: t('prompt.git'),
        default: gitOptions,
        when: !gitOptions,
    });

    return use_git;
};
