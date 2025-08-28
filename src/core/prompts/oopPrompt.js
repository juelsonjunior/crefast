import inquirer from 'inquirer';
import { t } from '../../i18n/index.js';

export const oopPrompt = async (oopOptions) => {
    const { use_oop } = await inquirer.prompt({
        type: 'list',
        name: 'use_oop',
        message: t('prompt.oop.question'),
        choices: [
            { name: t('prompt.oop.choice.oop') + ' (OOP)', value: 'oop' },
            { name: t('prompt.oop.choice.fp') + ' (FP)', value: 'fp' },
        ],
        default: oopOptions,
        when: !oopOptions,
    });

    return use_oop;
};
