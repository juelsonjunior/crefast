import chalk from 'chalk';
import { execa } from 'execa';

export const initializeProject = async (dir, answers) => {
    try {
        console.log(chalk.gray(`✨ Inicializando projeto NPM em ${dir}...`));
        await execa('npm', ['init', '-y'], { cwd: dir });
        console.log(chalk.green('✅ Projeto iniciado com sucesso'));
    } catch (err) {
        console.log(
            chalk.red('❌ Falha ao iniciar o projeto NPM:', err.message)
        );
    }

    if (answers.use_express) {
        try {
            console.log(chalk.gray(`✨ Instalando o express em ${dir}...`));
            await execa('npm', ['install', 'express'], { cwd: dir });
            console.log(chalk.green('✅ Express instalado com sucesso'));
        } catch (err) {
            console.log(
                chalk.red(
                    '❌ Falha ao instalar o express no projeto:',
                    err.message
                )
            );
        }
    }

    if (answers.use_express) {
        try {
            console.log(chalk.gray(`✨ Inicializando o git em ${dir}...`));
            await execa('git', ['init'], { cwd: dir });
            console.log(chalk.green('✅ Git instalado com sucesso'));
        } catch (err) {
            console.log(
                chalk.red(
                    '❌ Falha ao inicialzar o git no projeto:',
                    err.message
                )
            );
        }
    }

    if (answers.use_dotenv) {
        try {
            console.log(chalk.gray(`✨ Instalando o dotenv em ${dir}...`));
            await execa('npm', ['install', 'dotenv'], { cwd: dir });
            console.log(chalk.green('✅ Dotenv instalado com sucesso'));
        } catch (err) {
            console.log(
                chalk.red(
                    '❌ Falha ao instalar o dotenv no projeto:',
                    err.message
                )
            );
        }
    }
};
