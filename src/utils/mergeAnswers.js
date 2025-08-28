import {
    askProjectName,
    gitPrompt,
    oopPrompt,
    askStruturePrompt,
    createStructureModular,
    createStructureREST,
} from '../core/index.js';
import { finishMessage } from './finishMessage.js';
import { errorHandler } from './errorHandler.js';
import { t } from '../i18n/index.js';
export const mergeAnswers = async (options) => {
    try {
        const name = await askProjectName(options.name);
        const use_git = await gitPrompt(options.use_git);
        const use_oop = await oopPrompt(options.use_oop);
        const structure = await askStruturePrompt(options.structure);

        const answers = {
            ...options,
            name,
            use_git,
            use_oop,
            structure,
            safeName: name,
        };

        const structureHandler = {
            rest: createStructureREST,
            modular: createStructureModular,
        };

        const handler = structureHandler[structure.toLowerCase()];
        if (!handler) {
            throw new Error(t('error.structure.invalid'));
        }

        const success = await handler(answers);

        if (!success) {
            throw new Error(t('error.creation.failed'));
        }
        finishMessage(name);
    } catch (error) {
        errorHandler(t('error.catch.handler'), error);
    }
};
