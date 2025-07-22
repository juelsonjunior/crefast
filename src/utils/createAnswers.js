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
            default: options.name,
            when: !options.name,
        },
        {
            type: 'list',
            name: 'structure',
            message: 'Qual estrutura quer usar?',
            choices: ['REST', 'MVC', 'MODULAR'],
            default: options.structure,
            when: !options.structure,
        },
    ]);

    
    const answersMerged = { ...answers, ...options };
    const finalName = answersMerged.name || answersMerged.project_name;
    if (!finalName || !finalName.trim()) {
        return console.log(chalk.red('❌ Preencha o nome do projeto'));
    }
    answersMerged.safeName = finalName
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, '-');

    const structureHandler = {
        rest: structureREST,
        mvc: structureMvc,
        modular: structureModular,
    };
    
    const structureType = answersMerged.structure.toLowerCase();
    const handler = structureHandler[structureType];
    if (!handler) {
        console.error(chalk.red('❌ Estrutura inválida selecionada'));
        return;
    }

    const success = await handler(answersMerged);

    if (success) {
        console.log(chalk.green('✅ Estrutura criada com sucesso!'));
    } else {
        console.error(chalk.red('❌ Ocorreu um erro na criação da estrutura.'));
    }
};
