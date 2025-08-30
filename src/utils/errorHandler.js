import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import ora from 'ora';
import process from 'process';
import { t } from '../i18n/index.js';

const logFilePath = path.join(process.cwd(), 'cli-error.log');

export const errorHandler = (message, error) => {
    const spinner = ora();
    spinner.fail();

    console.error(chalk.red(`\n❌ ${message}`));
    console.error(chalk.gray(`${t('project.created.file.log')} ${logFilePath}`));
    
    const timestamp = new Date().toISOString();
    let logMessage = `[${timestamp}] - Erro: ${message}\n`;

    if (error?.stack) {
        logMessage += `Stack Trace:\n${error.stack}\n`;
    } else if (error?.message) {
        logMessage += `Mensagem:\n${error.message}\n`;
    } else {
        logMessage += `Erro:\n${String(error)}\n`;
    }
    
    logMessage += '-------------------------------------------------\n';

    // 4. Escreve os detalhes no arquivo de log (de forma síncrona)
    try {
        fs.appendFileSync(logFilePath, logMessage);
    } catch (logErr) {
    }

    process.exit(1);
};