import inquirer from 'inquirer';

export const oopPrompt = async (oopOptions) => {
    const { use_oop } = await inquirer.prompt({
        type: 'list',
        name: 'use_oop',
        message: 'Qual estilo de código você prefere?',
        choices: [
            { name: 'Orientado a Objetos (OOP)', value: 'oop' },
            { name: 'Programação Funcional (FP)', value: 'fp' },
        ],
        default: oopOptions,
        when: !oopOptions,
    });

    return use_oop;
};
