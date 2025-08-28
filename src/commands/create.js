import { mergeAnswers } from '../utils/index.js';
import { t } from '../i18n/index.js';

export const createCommand = (program) => {
    program
        .command('create [project_name]')
        .description(`📦 ${t('cli.create.description')}`)
        .option('-n, --name <name>', t('cli.name.project'))
        .option(
            '-t, --structure <type>',
            `${t('cli.structure')} (REST, MODULAR)`
        )
        .option('--no-git', t('cli.git.init'))
        .option('--no-dependences', t('cli.dependences'))
        .action(async (projectName, options) => {
            const name = options.name || projectName;
            if (name) {
                options.name = name;
            }

            await mergeAnswers(options);
        });
};
