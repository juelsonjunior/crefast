import fs from 'fs/promises';
import { createStructureREST } from '../createStructureRest.js';
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

describe('createStructureREST', () => {
   let consoleSpy;
    beforeAll(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterAll(() => {
        consoleSpy.mockRestore();
    });

    // Cenário 1: Sucesso (caminho completo)
    test('cria a estrutura do projeto REST com sucesso', async () => {
        // Mock de sucesso para resolveFolderConflict
        const pathsMock = {
            dir: '/fake/path',
            controllersPath: '/fake/path/controllers',
            routesPath: '/fake/path/routes',
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

        const answers = { safeName: 'meu-projeto', use_oop: 'no-oop' };

        generator.structureBuilder.mockImplementation(async (steps, context) => {
            for (const step of steps) {
                await step.action(context);
            }
        });

        const result = await createStructureREST(answers);

        // Assertions para o fluxo de sucesso
        expect(result).toBe(true);
        expect(fs.mkdir).toHaveBeenCalledWith('/fake/path', { recursive: true });
        expect(generator.structureBuilder).toHaveBeenCalled();
        expect(coreIndex.initializeProject).toHaveBeenCalled();

        expect(coreIndex.createIfNotExists).toHaveBeenCalledTimes(2); // Para 'controllers' e 'routes'
        expect(utilsIndex.createFromTemplate).toHaveBeenCalledTimes(10); // Conte o número de templates criados
        expect(utilsIndex.resolvePathTemplate).toHaveBeenCalled();
        expect(coreIndex.saveCliMetadata).toHaveBeenCalled();

        expect(utilsIndex.createFromTemplate).toHaveBeenCalledWith(
            'mocked/rest/controllers/no-oop/baseController.ejs',
            '/fake/path/controllers/baseController.js'
        );
        expect(coreIndex.saveCliMetadata).toHaveBeenCalledWith(
            pathsMock.dir,
            answers
        );
    });
    
    // Cenário 2: Cancelamento
    test('retorna false se a criação do projeto for cancelada', async () => {
        // Mock que simula o cancelamento
        utilsIndex.resolveFolderConflict.mockResolvedValue({
            canceled: true,
        });

        const result = await createStructureREST({});

        expect(result).toBe(false);
        // Garanta que nenhuma outra função foi chamada após o cancelamento
        expect(fs.mkdir).not.toHaveBeenCalled();
        expect(generator.structureBuilder).not.toHaveBeenCalled();
        expect(coreIndex.initializeProject).not.toHaveBeenCalled();
    });

    // Cenário 3: Estilo OOP
    test('cria a estrutura com um template adicional para estilo OOP', async () => {
        // Mock de sucesso
        utilsIndex.resolveFolderConflict.mockResolvedValue({
            safeName: 'meu-projeto',
            canceled: false,
            paths: {
                dir: '/fake/path',
                controllersPath: '/fake/path/controllers',
                routesPath: '/fake/path/routes',
                appPath: '/fake/path/app.js',
                serverPath: '/fake/path/server.js',
                readmePath: '/fake/path/README.md',
                gitIgnorePath: '/fake/path/.gitignore',
                prettierPath: '/fake/path/.prettierrc',
                eslintPath: '/fake/path/.eslintrc',
                envPath: '/fake/path/.env',
                envExemplePath: '/fake/path/.env.example',
            },
        });

        // Configura o answers para o cenário OOP
        const answers = { safeName: 'meu-projeto', use_oop: 'oop' };

        await createStructureREST(answers);

        // Verifique que os steps extras foram incluídos
        const stepsPassed = generator.structureBuilder.mock.calls[0][0];
        expect(stepsPassed.length).toBe(12); // O número de steps deve ser maior
    });

    // Cenário 4: Erro
    test('chama o errorHandler se ocorrer um erro', async () => {
        // Mock que simula um erro na primeira chamada
        utilsIndex.resolveFolderConflict.mockRejectedValue(
            new Error('Erro de teste')
        );

        const result = await createStructureREST({});

        expect(result).toBe(false);
        // Verifique se o errorHandler foi chamado com os argumentos corretos
        expect(utilsIndex.errorHandler).toHaveBeenCalledWith(
            'Erro ao criar a estrutura REST',
            expect.any(Error)
        );
    });
});