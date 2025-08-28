import { execa } from 'execa';
import { editPackageJson } from '../editPackageJson.js';
import { runWithSpinner } from '../../../utils/runWithSpinner.js';
import { errorHandler } from '../../../utils/index.js';
import { initializeProject } from '../initializeProject.js';

jest.mock('execa', () => ({
    execa: jest.fn(),
}));

jest.mock('../../../utils/runWithSpinner.js', () => ({
    runWithSpinner: jest.fn((msg, fn) => fn()),
}));

jest.mock('../editPackageJson.js', () => ({
    editPackageJson: jest.fn(),
}));

jest.mock('../../../utils/index.js', () => ({
    errorHandler: jest.fn(),
}));

describe('initializeProject', () => {
    const mockDir = '/projecto';
    const mockServerBase = 'src/index.js';
    const mockAnswers = { safeName: 'meu-projeto', use_git: true };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('executa instalação de pacotes e chama editPackageJson', async () => {
        await initializeProject(mockDir, mockServerBase, mockAnswers);

        expect(execa).toHaveBeenCalledWith('npm', ['init', '-y'], {
            cwd: mockDir,
        });
        expect(execa).toHaveBeenCalledWith(
            'npm',
            ['install', '-D', 'nodemon'],
            { cwd: mockDir }
        );
        expect(execa).toHaveBeenCalledWith('npm', ['install', 'express'], {
            cwd: mockDir,
        });
        expect(execa).toHaveBeenCalledWith('npm', ['install', 'dotenv'], {
            cwd: mockDir,
        });
        expect(editPackageJson).toHaveBeenCalledWith(
            mockDir,
            mockServerBase,
            'meu-projeto'
        );
    });

    test('inicia git se use_git for true', async () => {
        const mockAnswers = { safeName: 'meu-projeto', use_git: true };
        await initializeProject(mockDir, mockServerBase, mockAnswers);

        // Verifica se git init, add e commit foram chamados
        expect(execa).toHaveBeenCalledWith('git', ['init'], { cwd: mockDir });
        expect(execa).toHaveBeenCalledWith('git', ['add', '.'], {
            cwd: mockDir,
        });
        expect(execa).toHaveBeenCalledWith(
            'git',
            ['commit', '-m', 'chore: Initialize new Project'],
            { cwd: mockDir }
        );
    });

    test('não inicia git se use_git for false', async () => {
        const mockAnswers = { safeName: 'meu-projeto', use_git: false };
        await initializeProject(mockDir, mockServerBase, mockAnswers);

        // Verifique se os comandos do Git NÃO foram chamados
        expect(execa).not.toHaveBeenCalledWith('git', ['init'], {
            cwd: mockDir,
        });
        expect(execa).not.toHaveBeenCalledWith('git', ['add', '.'], {
            cwd: mockDir,
        });
        expect(execa).not.toHaveBeenCalledWith(
            'git',
            ['commit', '-m', 'chore: Initialize new Project'],
            { cwd: mockDir }
        );
    });

    test('chama errorHandler se a instalação falhar', async () => {
        const mockAnswers = { safeName: 'meu-projeto', use_git: false };
        runWithSpinner.mockImplementationOnce(() => {
            throw new Error('Erro na instalação!');
        });

        await initializeProject(mockDir, mockServerBase, mockAnswers);

        expect(errorHandler).toHaveBeenCalledWith(
            'Falha ao instalar e iniciar o projeto',
            expect.any(Error)
        );
    });

    test('chama errorHandler se o git falhar', async () => {        
        const mockAnswers = { safeName: 'meu-projeto', use_git: true };
        runWithSpinner.mockImplementationOnce(() => {});
        runWithSpinner.mockImplementationOnce(() => {
            throw new Error('Erro no git!');
        });

        await initializeProject(mockDir, mockServerBase, mockAnswers);

        expect(errorHandler).toHaveBeenCalledWith(
            'Falha ao inicializar o git no projeto',
            expect.any(Error)
        );
    });
});
