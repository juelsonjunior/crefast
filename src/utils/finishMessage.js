import chalk from 'chalk';
import { t } from '../i18n/index.js';

export const finishMessage = (projectName, packageManager) => {
    const msg = `
🚀 ${t('project.created.success')} ${chalk.green(projectName)}

${t('project.created.steps')}
1. ${chalk.gray(`📂 cd ${projectName}`)}
2. ${chalk.gray(`🛠️ ${packageManager} run dev`)}

        ${chalk.yellow(`✨ ${t('project.created.thanks')}`)}

${chalk.white(`${chalk.bold(`👉 ${t('project.created.fork')}`)} https://github.com/juelsonjunior/nodegen`)}
${chalk.white(`${chalk.bold(`💬 ${t('project.created.networking')}`)} https://www.linkedin.com/in/juelson-júnior-5b4974310`)}
    `;

    console.log(msg);
};
