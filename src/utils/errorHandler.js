import chalk from 'chalk';

export const errorHandler = (message, error) => {
    console.erro(chalk.red(`\n❌ ${message}`));
    
    if (!error?.message) console.error(chalk.gray(error.message));
    process.exit(1);
};
