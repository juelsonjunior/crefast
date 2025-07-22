import chalk from 'chalk';
import fs from 'fs/promises';
import inquirer from 'inquirer';

export const askConflictPrompt = async (projectName) => {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: `O diretório "${projectName}" já existe o que quer fazer?`,
            choices: [
                { name: '🔁 Renomear projeto', value: 'rename' },
                { name: '🧨 Sobrecrever (APAGAR pasta)', value: 'overwrite' },
                { name: '❌ Cancelar', value: 'cancel' },
            ],
        },
    ]);

    return action;
};

export const actionOverwrite = async (action, dir) => {
    if (action == 'overwrite') {
        console.log(chalk.yellow(`🧨 Apagando o diretório "${dir}"...`));
        await fs.rm(dir, { recursive: true, force: true });
        return { action: 'overwrite' };
    }
};
export const askNewNamePrompt = async () => {
    const { newName } = await inquirer.prompt([
        {
            type: 'input',
            name: 'newName',
            message: 'Digite o novo nome do projeto:',
            validate(input) {
                return input.trim()
                    ? true
                    : 'O nome do projeto não pode estar vazio.';
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
