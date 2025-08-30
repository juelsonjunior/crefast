import {
    askProjectName,
    gitPrompt,
    oopPrompt,
    askStruturePrompt,
    packageManagerPrompt,
    createStructureModular,
    createStructureREST,
} from '../core/index.js';
import { finishMessage } from './finishMessage.js';
import { errorHandler } from './errorHandler.js';
import { t } from '../i18n/index.js';
export const mergeAnswers = async (options) => {
    try {        
        const packageManager = await packageManagerPrompt(options.package);
        const name = await askProjectName(options.name);
        const use_git = await gitPrompt(options.git);
        const use_oop = await oopPrompt(options.style);
        const structure = await askStruturePrompt(options.structure);

        const answers = {
            ...options,
            name,
            use_git,
            use_oop,
            structure,
            packageManager,
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
        finishMessage(name, packageManager);
    } catch (error) {
        errorHandler(t('error.catch.handler'), error);
    }
};
