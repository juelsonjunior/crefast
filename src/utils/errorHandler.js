import chalk from 'chalk';

export const errorHandler = (message, error) => {
    console.error(chalk.red(`\n❌ ${message}`));

    if (error?.stack) {
        console.error(chalk.gray(error.stack));
    } else if (error?.message) {
        console.error(chalk.gray(error.message));
    } else {
        console.error(chalk.gray(String(error)));
    }

    process.exit(1);
};
