import { execa } from 'execa';
import { editPackageJson } from './editPackageJson.js';
import { runWithSpinner } from '../../utils/runWithSpinner.js';
import { errorHandler } from '../../utils/index.js';
import { t } from '../../i18n/index.js';

export const initializeProject = async (dir, serverBase, answers) => {
    try {
        await runWithSpinner(`${t('install.dependences')} ☕`, async () => {
            await execa('npm', ['init', '-y'], { cwd: dir });
            await execa('npm', ['install', '-D', 'nodemon'], { cwd: dir });
            await execa('npm', ['install', 'express'], { cwd: dir });
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
        errorHandler(t('error.catch.dependence'), err);
    }

    if (answers.use_git) {
        try {
            await runWithSpinner(`${t('install.git')} ☕`, async () => {
                await execa('git', ['init'], { cwd: dir });
                await execa('git', ['add', '.'], { cwd: dir });
                await execa(
                    'git',
                    ['commit', '-m', 'chore: Initialize new Project'],
                    { cwd: dir }
                );
            });
        } catch (err) {
            errorHandler(t('error.catch.git'), err);
        }
    }
};
