import inquirer from 'inquirer';
import { t } from '../../i18n/index.js';

export const packageManagerPrompt = async (packageManagerOptions) => {
    if (packageManagerOptions) {
        return packageManagerOptions;
    }

    const { package_manager } = await inquirer.prompt([
        {
            type: 'list',
            name: 'package_manager',
            message: t('prompt.package.manager'),
            choices: [
                { name: 'npm', value: 'npm' },
                { name: 'yarn', value: 'yarn' },
                { name: 'pnpm', value: 'pnpm' },
            ],
        },
    ]);

    return package_manager;
};
