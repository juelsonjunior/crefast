import { mergeAnswers } from '../utils/mergeAnswers.js';

export const createCommand = (program) => {
    program
        .command('create [project_name]')
        .description('Cria um novo projeto com estrutura REST, MVC ou MODULAR')
        .option('-n, --name <name>', 'Nome do projeto')
        .option(
            '-t, --structure <type>',
            'Tipo de estrutura (REST, MVC, MODULAR)'
        )
        .option('--no-git', 'Não inicializa um repositório Git')
        .option('--no-dependences', 'Não instala dependências automaticamente')
        .action(async (projectName, options) => {
            const name = options.name || projectName;
            if (name) {
                options.name = name;
            }

            await mergeAnswers(options);
        });
};
