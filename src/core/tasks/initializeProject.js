import { execa } from 'execa';
import { editPackageJson } from './editPackageJson.js';
import { runWithSpinner } from '../../utils/runWithSpinner.js';
import { errorHandler } from '../../utils/index.js';

export const initializeProject = async (dir, serverBase, answers) => {
    try {
        await runWithSpinner('Inicializando projeto com npm init', async () => {
            await execa('npm', ['init', '-y'], { cwd: dir });
            await editPackageJson(dir, serverBase, answers.safeName);
        });
    } catch (err) {
        errorHandler('Falha ao iniciar o projeto npm', err);
    }

    try {
        await runWithSpinner(
            'Instalando Nodemon como Dev dependência',
            async () => {
                await execa('npm', ['install', '-D', 'nodemon'], { cwd: dir });
            }
        );
    } catch (err) {
        errorHandler('Falha ao instalar a dependência nodemon', err);
    }

};
