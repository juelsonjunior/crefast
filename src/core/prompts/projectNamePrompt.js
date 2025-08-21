import inquirer from 'inquirer';

export const askProjectName = async (nameOption) => {
    const { project_name } = await inquirer.prompt([
        {
            type: 'input',
            name: 'project_name',
            message: 'Qual é o nome do projeto: ',
            default: nameOption,
            when: !nameOption,
            validate(input) {
                return input.trim()
                    ? true
                    : 'O nome do projeto não pode estar vazio.';
            },
        },
    ]);

    return project_name.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-');
};
