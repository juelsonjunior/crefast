import inquirer from 'inquirer';
import { t } from '../../i18n/index.js';

export const askProjectName = async (nameOption) => {
    if (nameOption) {        
        return nameOption.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-');
    }

    const { project_name } = await inquirer.prompt([
        {
            type: 'input',
            name: 'project_name',
            message: t('prompt.project.name'),
            validate(input) {
                return input.trim()
                    ? true
                    : t('prompt.project.empty');
            },
        },
    ]);

    return project_name.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-');
};
