import { gitPrompt } from '../gitPrompt.js';
import inquirer from 'inquirer';

jest.mock('inquirer', () => ({
    prompt: jest.fn(),
}));

describe('gitPrompt', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Retorna true quando usuário escolhe usar git', async () => {
        inquirer.prompt.mockResolvedValue({ use_git: true });

        const result = await gitPrompt(false);

        expect(inquirer.prompt).toHaveBeenCalledWith({
            type: 'confirm',
            name: 'use_git',
            message: 'Você deseja usar o Git para controle de versão?',
            default: false,
            when: true, // pois passamos gitOptions=false
        });

        expect(result).toBe(true);
    });

    test("Retorna false quando usuário não quer usar git", async () => {
        inquirer.prompt.mockResolvedValue({use_git: false})

        const result = await gitPrompt(true)
        expect(result).toBe(false)
    })
});
