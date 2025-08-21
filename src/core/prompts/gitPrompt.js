import inquirer from 'inquirer';

export const gitPrompt = async (gitOptions) => {
    const {use_git} = await inquirer.prompt ({
        type: 'confirm',
        name: 'use_git',
        message: 'Você deseja usar o Git para controle de versão?',
        default: gitOptions,
        when: !gitOptions
    })

    return use_git;
}
