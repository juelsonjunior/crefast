import chalk from 'chalk';
import { execa } from 'execa';
import { editPackageJson } from './editPackageJson.js';
import { runWithSpinner } from '../../utils/runWithSpinner.js';
import { errorHandler } from '../../utils/index.js';

export const initializeProject = async (dir, answers) => {
    try {
        await runWithSpinner('Inicializando projeto com npm init', async () => {
            await execa('npm', ['init', '-y'], { cwd: dir });
            await editPackageJson(dir, answers.safeName);
        });
    } catch (err) {
        errorHandler("Falha ao iniciar o projeto NPM", err)
    }

    if (answers.use_express) {
        try {
            console.log(chalk.gray(`✨ Instalando o express em ${dir}...`));
            await execa('npm', ['install', 'express'], { cwd: dir });
            console.log(chalk.green('✅ Express instalado com sucesso'));
        } catch (err) {
            console.error(
                chalk.red(
                    '❌ Falha ao instalar o express no projeto:',
                    err.message
                )
            );
            throw err;
        }
    }

    if (answers.use_dotenv) {
        try {
            console.log(chalk.gray(`✨ Instalando o dotenv em ${dir}...`));
            await execa('npm', ['install', 'dotenv'], { cwd: dir });
            console.log(chalk.green('✅ Dotenv instalado com sucesso'));
        } catch (err) {
            console.error(
                chalk.red(
                    '❌ Falha ao instalar o dotenv no projeto:',
                    err.message
                )
            );
            throw err;
        }
    }
};
