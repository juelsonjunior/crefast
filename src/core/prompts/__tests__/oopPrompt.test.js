import { oopPrompt } from '../oopPrompt';
import inquirer from 'inquirer';

jest.mock('inquirer', () => ({
    prompt: jest.fn(),
}));

describe('oopPrompt', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Retorna oop quando usuário escolhe OOP', async () => {
        inquirer.prompt.mockResolvedValue({ use_oop: 'oop' });

        const result = await oopPrompt(false);
        expect(result).toBe('oop');
    });

    test('retorna fp quando usuário escolhe FP', async () => {
        inquirer.prompt.mockResolvedValue({ use_oop: 'fp' });

        const result = await oopPrompt(false);
        expect(result).toBe('fp');
    });

    test('Retorna o valor da flag sem exibir o prompt', async () => {
        const oopOptions = 'fp';
        const result = await oopPrompt(oopOptions);

        expect(inquirer.prompt).not.toHaveBeenCalled();
        expect(result).toBe(oopOptions);
    });
});
