import fs from 'fs/promises';
import { createStructureModular } from '../createStructureModular.js';
import * as coreIndex from '../../../core/index.js';
import * as utilsIndex from '../../../utils/index.js';
import * as generator from '../structureBuilder.js';
import { resolvePathTemplate, resolveFolderConflict, createFromTemplate, errorHandler } from '../../../utils/index.js';

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
    let consoleSpy;
    beforeAll(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterAll(() => {
        consoleSpy.mockRestore();
    });

    // TESTE 1: Cenário OOP (já existente, com pequena correção)
    test('cria a estrutura do projeto MODULAR com sucesso (OOP)', async () => {
        const pathsMock = {
            dir: '/fake/path',
            controllersPath: '/fake/path/controllers',
            repositoriesPath: '/fake/path/repositories',
            routesPath: '/fake/path/routes',
            servicesPath: '/fake/path/services',
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

        generator.structureBuilder.mockImplementation(async (steps, context) => {
            for (const step of steps) {
                await step.action(context);
            }
        });

        const answers = { safeName: 'meu-projeto', use_oop: 'oop' };

        const result = await createStructureModular(answers);

        // Asserções
        expect(result).toBe(true);
        expect(fs.mkdir).toHaveBeenCalledWith(pathsMock.dir, { recursive: true });
        expect(generator.structureBuilder).toHaveBeenCalled();
        expect(coreIndex.initializeProject).toHaveBeenCalledWith(
            pathsMock.dir,
            pathsMock.serverPath,
            answers
        );

        expect(utilsIndex.createFromTemplate).toHaveBeenCalledTimes(13);
        expect(coreIndex.createIfNotExists).toHaveBeenCalledTimes(5); 
        expect(utilsIndex.createFromTemplate).toHaveBeenCalledWith(
            resolvePathTemplate('modular/controllers/oop', 'bindController.ejs'),
            `${pathsMock.controllersPath}/bindController.js`
        );
    });

    // TESTE 2: Cenário de cancelamento (seu teste original)
    test('retorna false se a criação for cancelada', async () => {
        utilsIndex.resolveFolderConflict.mockResolvedValue({
            canceled: true,
        });

        const result = await createStructureModular({});

        expect(result).toBe(false);
        expect(fs.mkdir).not.toHaveBeenCalled();
        expect(generator.structureBuilder).not.toHaveBeenCalled();
    });

    // TESTE 3: Cenário de erro (seu teste original)
    test('chama o errorHandler se ocorrer um erro', async () => {
        utilsIndex.resolveFolderConflict.mockRejectedValue(new Error('Test error'));

        const result = await createStructureModular({});

        expect(result).toBe(false);
        expect(utilsIndex.errorHandler).toHaveBeenCalledWith(
            'Erro ao criar a estrutura MODULAR',
            expect.any(Error)
        );
    });

    // TESTE 4: Cenário FP (Funcional) - AJUSTADO para cobrir a linha 44
    test('Cria estrutura Modular com o estilo de codificação funcional (FP)', async () => {
        const answers = {
            safeName: 'meu-app-fp',
            use_oop: 'fp',
        };

        const pathsMock = {
            dir: '/test/meu-app-fp',
            controllersPath: '/test/meu-app-fp/controllers',
            repositoriesPath: '/test/meu-app-fp/repositories',
            routesPath: '/test/meu-app-fp/routes',
            servicesPath: '/test/meu-app-fp/services',
            appPath: '/test/meu-app-fp/app.js',
            serverPath: '/test/meu-app-fp/server.js',
            readmePath: '/test/meu-app-fp/README.md',
            gitIgnorePath: '/test/meu-app-fp/.gitignore',
            prettierPath: '/test/meu-app-fp/.prettierrc',
            eslintPath: '/test/meu-app-fp/.eslintrc',
            envPath: '/test/meu-app-fp/.env',
            envExemplePath: '/test/meu-app-fp/.env.example',
        };
        utilsIndex.resolveFolderConflict.mockResolvedValue({
            safeName: 'meu-app-fp',
            canceled: false,
            paths: pathsMock,
        });

        generator.structureBuilder.mockImplementation(async (steps, context) => {
            for (const step of steps) {
                await step.action(context);
            }
        });

        const result = await createStructureModular(answers);

        // Asserções
        expect(result).toBe(true);
        expect(utilsIndex.createFromTemplate).toHaveBeenCalledTimes(12); // Sem o bindController.ejs, a contagem é 13
        expect(coreIndex.createIfNotExists).toHaveBeenCalledTimes(4);
        
        // Verifique que o template ESPECÍFICO do OOP (bindController) NÃO foi chamado
        expect(utilsIndex.createFromTemplate).not.toHaveBeenCalledWith(
            expect.stringContaining('bindController')
        );

        // Verifique que o template ESPECÍFICO do FP foi usado
        expect(utilsIndex.createFromTemplate).toHaveBeenCalledWith(
            resolvePathTemplate('modular/fp', 'app.ejs'),
            pathsMock.appPath
        );

        // Verifica os templates das pastas
        expect(utilsIndex.createFromTemplate).toHaveBeenCalledWith(
            resolvePathTemplate('modular/controllers/fp', 'baseController.ejs'),
            `${pathsMock.controllersPath}/baseController.js`
        );
    });
});