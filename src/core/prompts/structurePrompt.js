import inquirer from 'inquirer';
import { t } from '../../i18n/index.js';

export const askStruturePrompt = async (structureOptions) => {
    const { structure } = await inquirer.prompt([
        {
            type: 'list',
            name: 'structure',
            message: t('prompt.structure'),
            choices: ['REST', 'MODULAR'],
            default: structureOptions,
            when: !structureOptions,
        },
    ]);

    return structure.toUpperCase();
};
