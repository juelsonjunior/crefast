// index.js
import { Command } from 'commander';
import { createCommand } from './commands/create.js';
import { setLang, t } from './i18n/index.js';

const program = new Command();

program.option('--lang <lang>', 'Idioma da CLI (pt ou en)', 'pt');

// Usa parseOptions() para ler as opções passadas na linha de comando.
// Isso não dispara ações ou ajuda, apenas lê as opções.
const { args, unknown } = program.parseOptions(process.argv);

// Pega o valor da flag '--lang' do objeto de opções.
// Se a flag não for fornecida, opts.lang será 'pt' (o valor padrão).
const opts = program.opts();
setLang(opts.lang);

program
    .name('crefast')
    .description('🚀 ' + t('cli.description'))
    .version('1.0.0');

createCommand(program);

program.parse(process.argv);
