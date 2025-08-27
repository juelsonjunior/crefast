import { editPackageJson } from '../editPackageJson.js';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { errorHandler } from '../../../utils/index.js';

jest.mock('fs/promises', () => ({
    readFile: jest.fn(),
    writeFile: jest.fn(),
}));

jest.mock('../../../utils/index.js', () => ({
    errorHandler: jest.fn(),
}));

describe('editpackageJson', () => {
    const mockDir = '/projecto';
    const mockServerBase = 'src/index.js';
    const mockName = 'meu-projecto';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Modifica corretamente o package.json', async () => {
        const originalContent = {
            name: 'velho-nome',
            scripts: { test: 'echo test' },
        };

        readFile.mockResolvedValue(JSON.stringify(originalContent));

        await editPackageJson(mockDir, mockServerBase, mockName);

        const expectContent = {
            ...originalContent,
            name: mockName,
            description: 'Breve descrição sobre o seu projecto',
            type: 'module',
            main: 'src/index.js',
            scripts: {
                ...originalContent.scripts,
                dev: 'nodemon src/index.js',
            },
        };

        expect(writeFile).toHaveBeenCalledWith(
            path.join(mockDir, 'package.json'),
            JSON.stringify(expectContent, null, 2)
        );
    });

    test('Adiciona scripts e main se não existirem', async () => {
        const originalContent = {
            name: 'velho-nome',
            // O objeto original não tem a propriedade 'scripts'
        };

        readFile.mockResolvedValue(JSON.stringify(originalContent));

        await editPackageJson(mockDir, mockServerBase, mockName);

        const expectContent = {
            ...originalContent,
            name: mockName,
            description: 'Breve descrição sobre o seu projecto',
            type: 'module',
            main: 'src/index.js',
            scripts: {
                dev: 'nodemon src/index.js',
            },
        };

        expect(writeFile).toHaveBeenCalledWith(
            path.join(mockDir, 'package.json'),
            JSON.stringify(expectContent, null, 2)
        );
    });

    test('Chama erorHandler se ocorrer erro', async () => {
        readFile.mockRejectedValue(new Error('Falha ao ler'));

        await editPackageJson(mockDir, mockServerBase, mockName);

        expect(errorHandler).toHaveBeenCalledWith(
            'Falha ao editar o arquivo package.json',
            expect.any(Error)
        );
    });
});
