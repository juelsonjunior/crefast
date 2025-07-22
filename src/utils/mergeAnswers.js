import chalk from 'chalk';

import {
    askProjectName,
    askStruturePrompt,
    createStructureModular,
    createStructureMvc,
    createStructureREST,
} from '../core/index.js';
import { finishMessage } from './finishMessage.js';

export const mergeAnswers = async (options) => {
    const name = await askProjectName(options.name);
    const structure = await askStruturePrompt(options.structure);

    const answers = {
        ...options,
        name,
        structure,
        safeName: name,
    };

    const structureHandler = {
        rest: createStructureREST,
        mvc: createStructureMvc,
        modular: createStructureModular,
    };

    const handler = structureHandler[structure.toLowerCase()];
    if (!handler) {
        console.error(chalk.red('❌ Estrutura inválida selecionada'));
        return;
    }

    const success = await handler(answers);

    if (success) {
        finishMessage(name);
    } else {
        console.error(chalk.red('❌ Ocorreu um erro na criação da estrutura.'));
    }
};
