import chalk from 'chalk';

export const finishMessage = (projectName) => {
    const msg = `
    🚀 Projeto criado com sucesso: ${chalk.green(projectName)}

    Próximos passos:
    1. ${chalk.gray(`📂 cd ${projectName}`)}
    2. ${chalk.gray('🛠️  npm run dev')}

                ${chalk.yellow('✨ Obrigado por usar o Nodegen CLI')}

    ${chalk.white(`${chalk.bold('👉 Contribua')} https://github.com/juelsonjunior/nodegen`)}
    ${chalk.white(`${chalk.bold('💬 Ideias:')} https://www.linkedin.com/in/juelson-júnior-5b4974310`)}
    `;

    console.log(msg);
};