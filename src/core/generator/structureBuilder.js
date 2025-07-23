import fs from 'fs/promises';
import path from 'path';
import { errorHandler } from '../../utils/index.js';
import chalk from 'chalk';

export const structureBuilder = async (steps, context) => {
    for (const step of steps) {
        const resultPath = await step.action(context);

        if (typeof resultPath === 'string') {
            try {
                const stats = await fs.stat(resultPath);
                const size = stats.size;

                const fullPath = path.relative(process.cwd(), resultPath).replace(/\\/g, '/');
                console.log(
                    `${chalk.green('✅ CRIAR')} ${fullPath} (${size} bytes)`
                );
            } catch (err) {
                errorHandler(`Erro ao obter info de ${resultPath}`, err);
            }
        }
    }
};
