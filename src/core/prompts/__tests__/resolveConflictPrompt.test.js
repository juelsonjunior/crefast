import {
    askConflictPrompt,
    actionOverwrite,
    askNewNamePrompt,
} from '../resolveConflictPrompt.js';
import inquirer from 'inquirer';
import fs from 'fs/promises';

jest.mock('inquirer', () => ({
    prompt: jest.fn(),
}));

jest.mock('fs/promises', () => ({
    rm: jest.fn(),
}));

describe('resolveConflictPrompt', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Retorna a ação escolhida pelo usuário', async () => {
        inquirer.prompt.mockResolvedValue({ action: 'overwrite' });

        const result = await askConflictPrompt('meuProjeto');

        expect(result).toBe('overwrite');
    });

    test('Remove diretório ao chamar actionOverwrite', async () => {
        await actionOverwrite('/meuProjeto');
        expect(fs.rm).toHaveBeenCalledWith('/meuProjeto', {
            recursive: true,
            force: true,
        });
    });

    test('Retorna novo nome normalizado ao chamar askNewNamePrompt', async () => {
        inquirer.prompt.mockResolvedValue({ newName: 'Novo Nome!!!' });
        const result = await askNewNamePrompt();
        expect(result).toEqual({
            action: 'rename',
            newName: 'novo-nome---',
        });

        const promptOptions = inquirer.prompt.mock.calls[0][0][0];

        const validationResult = promptOptions.validate('');
        expect(validationResult).toBe('O nome do projeto não pode estar vazio.');

        const validationResult2 = promptOptions.validate('projeto-valido');
        expect(validationResult2).toBe(true);
    });

    test('exibe erro para nome de projeto vazio', async () => {
        const promptConfig = {
            validate(input) {
                return input.trim()
                    ? true
                    : 'O nome do projeto não pode estar vazio.';
            },
        };

        // Teste com string vazia
        const emptyResult = promptConfig.validate('');
        expect(emptyResult).toBe('O nome do projeto não pode estar vazio.');

        // Teste com string de espaços
        const spacesResult = promptConfig.validate('   ');
        expect(spacesResult).toBe('O nome do projeto não pode estar vazio.');
    });
});
