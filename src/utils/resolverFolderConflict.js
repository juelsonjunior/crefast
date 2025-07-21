import fs from 'fs/promises';
import inquirer from 'inquirer';

export const resolverFolderConflict = async (dir, currentSafeName) => {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: `O diretorio "${currentSafeName}" á existe o que quer fazer?`,
            choices: [
                { name: '🔁 Renomear projeto', value: 'rename' },
                { name: '🧨 Sobrecrever (APAGAR pasta)', value: 'overwrite' },
                { name: '❌ Cancelar', value: 'cancel' },
            ],
        },
    ]);

    if (action == 'cancel') return { action: 'cancel' };

    if (action == 'rename') {
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
    }

    if (action == 'overwrite') {
        await fs.rm(dir, { recursive: true, force: true });
        return { action: 'overwrite' };
    }
};
