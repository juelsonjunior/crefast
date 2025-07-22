import { createAnswers } from '../utils/index.js';

export const createCommand = (program) => {
    program
        .command('create [project_name]')
        .description('Criar um projeto')
        .option('-n, --name <name>', 'Nome do projeto')
        .option(
            '-t, --structure <type>',
            'Tipo de estrutura (REST, MVC, MODULAR)'
        )
        .option('--no-git', 'Não inicializa o projeto git')
        .option('--no-dependences', 'Não instala as dependencias')
        .action(async (projectName, options) => {
            const name = options.name || projectName;
            if (name) {
                options.name = name;
            }

            await createAnswers(options);
        });
};
