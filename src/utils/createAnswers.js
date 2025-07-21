import chalk from 'chalk';
import inquirer from 'inquirer';

import {
    structureREST,
    structureMvc,
    structureModular,
} from './structures/index.js';

export const createAnswers = async (options) => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'project_name',
            message: 'Qual é o nome do projeto',
            default: options.name || undefined,
        },
        {
            type: 'list',
            name: 'structure',
            message: 'Qual estrutura quer usar?',
            choices: ['REST', 'MVC', 'MODULAR'],
            default: options.structure || undefined,
        },
    ]);

    const safeName = answers.project_name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, '-');

    if (!safeName) {
        return console.log(chalk.red('❌ Preencha o nome do projeto'));
    }

    const structureHandler = {
        rest: structureREST,
        mvc: structureMvc,
        modular: structureModular,
    };

    const structureType = answers.structure.toLowerCase();
    const handler = structureHandler[structureType];

    if (!handler) {
        console.error(chalk.red('❌ Estrutura inválida selecionada'));
        return;
    }

    const success = await handler({ ...answers, safeName });

    if (success) {
        console.log(chalk.green('✅ Estrutura criada com sucesso!'));
    } else {
        console.error(chalk.red('❌ Ocorreu um erro na criação da estrutura.'));
    }
};
