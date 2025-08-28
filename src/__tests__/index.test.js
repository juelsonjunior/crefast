import { Command } from 'commander';
import { createCommand } from '../commands/create.js';

jest.mock('commander', () => {
    const mockOpts = { lang: 'pt' };
    const mockProgram = {
        name: jest.fn().mockReturnThis(),
        description: jest.fn().mockReturnThis(),
        version: jest.fn().mockReturnThis(),
        option: jest.fn().mockReturnThis(),
        // Adicione o mock para parseOptions aqui
        parseOptions: jest
            .fn()
            .mockReturnValue({ args: ['mock-arg'], unknown: [] }),
        opts: jest.fn(() => mockOpts),
        parse: jest.fn(),
    };

    return { Command: jest.fn(() => mockProgram) };
});

// 2. Mock the `createCommand` function as well.
//    This allows you to check if it's called correctly.
jest.mock('../commands/create.js', () => ({
    createCommand: jest.fn(),
}));

describe('nodegen CLI entry point', () => {
    test('Deve registrar comandos e analisar argumentos', () => {
        require('../index.js');

        const { Command } = require('commander');
        const mockProgramInstance = Command.mock.results[0].value;

        mockProgramInstance.parseOptions.mockReturnValue({
            args: ['node', 'nodegen'],
            unknown: ['--lang', 'pt'],
        });

        expect(mockProgramInstance.opts).toHaveBeenCalled();
        expect(mockProgramInstance.opts()).toEqual({ lang: 'pt' });
        expect(mockProgramInstance.parseOptions).toHaveBeenCalledWith(process.argv);
        expect(mockProgramInstance.name).toHaveBeenCalledWith('nodegen');
        expect(mockProgramInstance.description).toHaveBeenCalledWith(
            '🚀 Gerador de estrutura para projetos Node.js'
        );
        expect(mockProgramInstance.version).toHaveBeenCalledWith('1.0.0');

        expect(mockProgramInstance.option).toHaveBeenCalledWith(
            '--lang <lang>',
            'Idioma da CLI (pt ou en)',
            'pt'
        );

        expect(createCommand).toHaveBeenCalledWith(mockProgramInstance);

        expect(mockProgramInstance.parse).toHaveBeenCalled();
    });
});
