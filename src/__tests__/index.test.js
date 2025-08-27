import { Command } from 'commander';
import { createCommand } from '../commands/create.js';

// Mock the createCommand function to prevent its logic from running
jest.mock('../commands/create.js', () => ({
    createCommand: jest.fn(),
}));

describe('nodegen CLI entry point', () => {
    let programSpy;

    beforeEach(() => {
        // Spy on the `parse` method to check if it's called
        programSpy = jest.spyOn(Command.prototype, 'parse');

        // Clear all mocks and spies before each test
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    test('Deve registar comandos e analisar argumentos', () => {
        // This requires a mock of the entire 'commander' module
        jest.mock('commander', () => {
            const mockProgram = {
                name: jest.fn().mockReturnThis(),
                description: jest.fn().mockReturnThis(),
                version: jest.fn().mockReturnThis(),
                parse: jest.fn(),
            };
            return { Command: jest.fn(() => mockProgram) };
        });

        // Import the file to be tested. The mock will be used.
        require('../index.js');

        // Assert that the program's methods are called with the correct values
        const { Command } = require('commander');
        const mockProgramInstance = Command.mock.results[0].value;

        // Verify basic program configuration
        expect(mockProgramInstance.name).toHaveBeenCalledWith('nodegen');
        expect(mockProgramInstance.description).toHaveBeenCalledWith(
            '🚀 Gerador de estrutura para projectos Node.js'
        );
        expect(mockProgramInstance.version).toHaveBeenCalledWith('1.0.0');

        // Verify that the createCommand function is called
        expect(createCommand).toHaveBeenCalledWith(mockProgramInstance);

        // Verify that program.parse() is called
        expect(mockProgramInstance.parse).toHaveBeenCalled();
    });
});
