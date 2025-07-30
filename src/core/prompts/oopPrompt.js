import inquirer from 'inquirer';

export const oopPrompt = async (oopOptions) => {
    const { use_oop } = await inquirer.prompt({
        type: 'confirm',
        name: 'use_oop',
        message: 'Você deseja usar orientação a objecto?',
        default: oopOptions,
        when: !oopOptions,
    });

    return use_oop;
};
