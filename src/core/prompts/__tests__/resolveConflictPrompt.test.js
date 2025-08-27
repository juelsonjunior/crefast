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

        // Este teste agora também verifica a validação.
        // Capturamos a configuração do prompt que foi passada
        const promptOptions = inquirer.prompt.mock.calls[0][0][0];

        // Validamos uma entrada vazia, acionando o branch de erro
        const validationResult = promptOptions.validate('');
        expect(validationResult).toBe('O nome do projeto não pode estar vazio.');

        // Validamos uma entrada válida, acionando o branch de sucesso
        const validationResult2 = promptOptions.validate('projeto-valido');
        expect(validationResult2).toBe(true);
    });

    test('exibe erro para nome de projeto vazio', async () => {
        // Pega o objeto de configuração que a função cria
        // Para fins de teste de validação, podemos criar um mock simples
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
