import fs from 'fs/promises';
import { createStructureModular } from '../createStructureModular.js';
import * as coreIndex from '../../../core/index.js';
import * as utilsIndex from '../../../utils/index.js';
import * as generator from '../structureBuilder.js';

// Mocks para as dependências
jest.mock('fs/promises', () => ({
    mkdir: jest.fn(),
}));

jest.mock('../../../core/index.js', () => ({
    createIfNotExists: jest.fn(),
    initializeProject: jest.fn(),
    saveCliMetadata: jest.fn(),
}));

jest.mock('../../../utils/index.js', () => ({
    createFromTemplate: jest.fn(),
    resolvePathTemplate: jest.fn((dir, file) => `mocked/${dir}/${file}`),
    errorHandler: jest.fn(),
    resolveFolderConflict: jest.fn(),
}));

jest.mock('../structureBuilder.js', () => ({
    structureBuilder: jest.fn(),
}));

describe('createStructureModular', () => {
    test('cria a estrutura do projeto MODULAR com sucesso', async () => {
        // Mock de sucesso para resolveFolderConflict
        const pathsMock = {
            dir: '/fake/path',
            controllersPath: '/fake/path/controllers',
            routesPath: '/fake/path/routes',
            repositoriesPath: '/fake/path/repositories',
            servicesPath: '/fake/path/services',
            // Adicione todos os outros paths
            appPath: '/fake/path/app.js',
            serverPath: '/fake/path/server.js',
            readmePath: '/fake/path/README.md',
            gitIgnorePath: '/fake/path/.gitignore',
            prettierPath: '/fake/path/.prettierrc',
            eslintPath: '/fake/path/.eslintrc',
            envPath: '/fake/path/.env',
            envExemplePath: '/fake/path/.env.example',
        };
        utilsIndex.resolveFolderConflict.mockResolvedValue({
            safeName: 'meu-projeto',
            canceled: false,
            paths: pathsMock,
        });

        // Mockamos o structureBuilder para executar as ações dos steps
        generator.structureBuilder.mockImplementation(
            async (steps, context) => {
                for (const step of steps) {
                    await step.action(context);
                }
            }
        );

        const answers = { safeName: 'meu-projeto', use_oop: 'oop' }; // Ou 'no-oop', dependendo do cenário

        const result = await createStructureModular(answers);

        // Asserções
        expect(result).toBe(true);
        expect(fs.mkdir).toHaveBeenCalledWith(pathsMock.dir, {
            recursive: true,
        });
        expect(generator.structureBuilder).toHaveBeenCalled();
        expect(coreIndex.initializeProject).toHaveBeenCalledWith(
            pathsMock.dir,
            pathsMock.serverPath,
            answers
        );

        // Verifique se as funções internas foram chamadas o número de vezes correto
        expect(coreIndex.createIfNotExists).toHaveBeenCalledTimes(5); // Controllers, Repositories, Routes, Services
        expect(utilsIndex.createFromTemplate).toHaveBeenCalledTimes(13); // Conte o número total de templates
        expect(coreIndex.saveCliMetadata).toHaveBeenCalledWith(
            pathsMock.dir,
            answers
        );
    });

    test('retorna false se a criação for cancelada', async () => {
        utilsIndex.resolveFolderConflict.mockResolvedValue({
            canceled: true,
        });

        const result = await createStructureModular({});

        expect(result).toBe(false);
        expect(fs.mkdir).not.toHaveBeenCalled();
        expect(generator.structureBuilder).not.toHaveBeenCalled();
    });

    test('chama o errorHandler se ocorrer um erro', async () => {
        // Mock para simular um erro
        utilsIndex.resolveFolderConflict.mockRejectedValue(
            new Error('Test error')
        );

        const result = await createStructureModular({});

        expect(result).toBe(false);
        expect(utilsIndex.errorHandler).toHaveBeenCalledWith(
            'Erro ao criar a estrutura MODULAR',
            expect.any(Error)
        );
    });
});
