import fs from 'fs/promises';
import inquirer from 'inquirer';
import { t } from '../../i18n/index.js';

export const askConflictPrompt = async (projectName) => {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: `${t('prompt.conflict.question1')} ${projectName} ${t('prompt.conflict.question2')}`,
            choices: [
                { name: `🔁 ${t('Rename project')}`, value: 'rename' },
                {
                    name: `🧨 ${t('prompt.conflict.overwrite')}`,
                    value: 'overwrite',
                },
                { name: `❌ ${t('prompt.conflict.cancel')}`, value: 'cancel' },
            ],
        },
    ]);

    return action;
};

export const actionOverwrite = async (dir) => {
    await fs.rm(dir, { recursive: true, force: true });
};
export const askNewNamePrompt = async () => {
    const { newName } = await inquirer.prompt([
        {
            type: 'input',
            name: 'newName',
            message: t('prompt.conflict.rename.question'),
            validate(input) {
                return input.trim()
                    ? true
                    : t('prompt.project.empty');
            },
        },
    ]);
    return {
        action: 'rename',
        newName: newName
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9-_]/g, '-'),
    };
};
