import { execa } from 'execa';
import { editPackageJson } from './editPackageJson.js';
import { runWithSpinner } from '../../utils/runWithSpinner.js';
import { errorHandler, validatePackageManager } from '../../utils/index.js';
import { t } from '../../i18n/index.js';

const packageManagerConfig = {
    npm: {
        installCommand: 'install',
        devFlag: '--save-dev',
        initCommand: 'init',
        initArgs: ['-y'],
    },
    yarn: {
        installCommand: 'add',
        devFlag: '-D',
        initCommand: 'init',
        initArgs: ['-y'],
    },
    pnpm: {
        installCommand: 'add',
        devFlag: '--save-dev',
        initCommand: 'init',
        initArgs: [],
    },
};
export const initializeProject = async (dir, serverBase, answers) => {
    const packageManager = answers.packageManager;

    const { installCommand, devFlag, initCommand, initArgs } =
        packageManagerConfig[packageManager];

    const dependencies = ['express', 'dotenv'];
    const devDependencies = [
        'nodemon',
        '@eslint/js',
        'eslint',
        'globals',
        'prettier',
    ];

    try {
        await runWithSpinner(`${t('install.dependences')} ☕`, async () => {
            await validatePackageManager(packageManager);
            
            // Executa o comando de inicialização
            await execa(packageManager, [initCommand, ...initArgs], {
                cwd: dir,
            });

            // Instala as dependências de desenvolvimento
            await execa(
                packageManager,
                [installCommand, devFlag, ...devDependencies],
                { cwd: dir }
            );

            // Instala as dependências de produção
            await execa(packageManager, [installCommand, ...dependencies], {
                cwd: dir,
            });

            await editPackageJson(dir, serverBase, answers.safeName);
        });
    } catch (err) {
        errorHandler(t('error.catch.dependence'), err);
    }

    if (answers.use_git) {
        try {
            await runWithSpinner(`${t('install.git')} ☕`, async () => {
                await execa('git', ['init'], { cwd: dir });
                await execa('git', ['add', '.'], { cwd: dir });
                await execa(
                    'git',
                    ['commit', '-m', 'chore: Initialize new Project'],
                    { cwd: dir }
                );
            });
        } catch (err) {
            errorHandler(t('error.catch.git'), err);
        }
    }
};
