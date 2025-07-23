import { runWithSpinner } from '../../utils/index.js';

export const structureBuilder = async (steps, context) => {
    for (const step of steps) {
        runWithSpinner(step.label, async () => await step.action(context));
    }
};
