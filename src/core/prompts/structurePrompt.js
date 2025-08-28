import inquirer from 'inquirer';
import { t } from '../../i18n/index.js';

export const askStruturePrompt = async (structureOptions) => {
    if (structureOptions) {
        return structureOptions.toUpperCase();
    }
    const { structure } = await inquirer.prompt([
        {
            type: 'list',
            name: 'structure',
            message: t('prompt.structure'),
            choices: ['REST', 'MODULAR']
        },
    ]);

    return structure.toUpperCase();
};
