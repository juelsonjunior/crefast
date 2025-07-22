import boxen from 'boxen';
import chalk from 'chalk';

export const finishMessage = (projectName) => {
    const msg = `
    ${chalk.greenBright('🎉 Projeto criado com sucesso!')}

    👉 Para começar:

    ${chalk.cyan(`cd ${projectName}`)}
    ${chalk.cyan('npm run dev')} ${chalk.gray('// ou seu script principal')}

    ${chalk.bold('Boas construções 🚀')}
    `;
    
    const box = boxen(msg, {
        padding: 1,
        margin: 1,
        borderColor: 'green',
        borderStyle: 'round',
    });

    console.log(box);
};
