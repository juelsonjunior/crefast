import { Command } from 'commander';
import { createCommand } from './commands/create.js';

const program = new Command();

program
    .name('nodegen')
    .description('CLI para gerar estrutura de projetos')
    .version('1.0.0');

createCommand(program);

program.parse(program.argv);
