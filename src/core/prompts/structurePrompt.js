import inquirer from 'inquirer';

export const askStruturePrompt = async (structureOptions) => {
    const { structure } = await inquirer.prompt([
        {
            type: 'list',
            name: 'structure',
            message: 'Qual estrutura quer usar?',
            choices: ['REST', 'MVC', 'MODULAR'],
            default: structureOptions,
            when: !structureOptions,
        },
    ]);

    return structure.toUpperCase();
};
