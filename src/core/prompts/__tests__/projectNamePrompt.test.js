import { askProjectName } from '../projectNamePrompt';
import inquirer from 'inquirer';

jest.mock('inquirer', () => ({
    prompt: jest.fn(),
}));

describe('askPromptName', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('retorna nome normalizado', async () => {
        inquirer.prompt.mockResolvedValue({ project_name: 'Meu projeto 123!' });

        const result = await askProjectName(false);

        expect(result).toBe('meu-projeto-123-');
    });

    test('Não exibe prompt quando um nome é passado via flag', async () => {
        const result = await askProjectName('defaultName');
        expect(inquirer.prompt).not.toHaveBeenCalled();
        expect(result).toBe('defaultname');
    });

    test('exibe erro para nome de projeto vazio', async () => {
        inquirer.prompt.mockImplementation((config) => {
            const validationFn = config[0].validate;

            // Testa os dois cenários da validação diretamente
            // Cenário 1: Entrada inválida (string vazia ou apenas espaços)
            const emptyInputResult = validationFn('');
            expect(emptyInputResult).toBe(
                'O nome do projeto não pode estar vazio.'
            );

            const spaceInputResult = validationFn('   ');
            expect(spaceInputResult).toBe(
                'O nome do projeto não pode estar vazio.'
            );

            // Cenário 2: Entrada válida
            const validResult = validationFn('meu-projeto');
            expect(validResult).toBe(true);

            // Retorna um valor mockado para que a função continue a execução
            return Promise.resolve({ project_name: 'mock-valid' });
        });

        // Chama a função que irá acionar o mock
        await askProjectName(false);

        // Opcional: verifique se o prompt foi chamado
        expect(inquirer.prompt).toHaveBeenCalled();
    });
});
