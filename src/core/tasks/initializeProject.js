import { execa } from 'execa';
import { editPackageJson } from './editPackageJson.js';
import { runWithSpinner } from '../../utils/runWithSpinner.js';
import { errorHandler } from '../../utils/index.js';

export const initializeProject = async (dir, serverBase, answers) => {
    try {
        await runWithSpinner('Instalando e processando...☕', async () => {
            await execa('npm', ['init', '-y'], { cwd: dir });
            await execa('npm', ['install', '-D', 'nodemon'], { cwd: dir });
            await execa('npm', ['install', 'dotenv'], { cwd: dir });
            await execa(
                'npm',
                [
                    'install',
                    '-D',
                    '@eslint/js',
                    'eslint',
                    'globals',
                    'prettier',
                ],
                { cwd: dir }
            );
            await editPackageJson(dir, serverBase, answers.safeName);
        });
    } catch (err) {
        errorHandler('Falha ao instalar e iniciar o projecto', err);
    }
};
