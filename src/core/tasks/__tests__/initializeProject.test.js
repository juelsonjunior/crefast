import  execa  from 'execa';
import { editPackageJson } from '../editPackageJson.js';
import { runWithSpinner } from '../../../utils/runWithSpinner.js';
import { errorHandler } from '../../../utils/index.js';
import { initializeProject } from '../initializeProject.js';

//Corrigir compatibilidade ESM para rodar este teste
jest.mock('execa', () => {
  const execaMock = jest.fn();
  return { __esModule: true, default: execaMock };
});


jest.mock('../../../utils/runWithSpinner.js', () => ({
    runWithSpinner: jest.fn((msg, fn) => {
        return fn ? fn() : Promise.resolve();
    }),
}));

jest.mock('../editPackageJson.js', () => ({
    editPackageJson: jest.fn(),
}));

jest.mock('../../../utils/index.js', () => ({
    errorHandler: jest.fn(),
}));

describe.skip('initializeProject', () => {
    const mockDir = '/projecto';
    const mockServerBase = 'src/index.js';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test.skip('executa instalação de pacotes e chama editPackageJson', async () => {
        const mockAnswers = {
            safeName: 'meu-projeto',
            use_git: false,
            packageManager: 'npm',
        };
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

    test.skip('inicia git se use_git for true', async () => {
        const mockAnswers = {
            safeName: 'meu-projeto',
            use_git: true,
            packageManager: 'npm',
        };
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

    test.skip('não inicia git se use_git for false', async () => {
        const mockAnswers = {
            safeName: 'meu-projeto',
            use_git: false,
            packageManager: 'npm',
        };
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

    test.skip('chama errorHandler se a instalação falhar', async () => {
        const mockAnswers = {
            safeName: 'meu-projeto',
            use_git: false,
            packageManager: 'npm',
        };
        runWithSpinner.mockImplementationOnce(() => {
            throw new Error('Erro na instalação!');
        });

        await initializeProject(mockDir, mockServerBase, mockAnswers);

        expect(errorHandler).toHaveBeenCalledWith(
            'Falha ao instalar e iniciar o projeto',
            expect.any(Error)
        );
    });

    test.skip('chama errorHandler se o git falhar', async () => {
        const mockAnswers = {
            safeName: 'meu-projeto',
            use_git: true,
            packageManager: 'npm',
        };
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
