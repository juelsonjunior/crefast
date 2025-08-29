import { askStruturePrompt } from '../structurePrompt.js';
import inquirer from 'inquirer';

jest.mock('inquirer', () => ({
  prompt: jest.fn(),
}));

describe('structurePrompt', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('retorna estrutura em maiúsculas', async () => {
    inquirer.prompt.mockResolvedValue({ structure: 'mvc' });

    const result = await askStruturePrompt(false);

    expect(result).toBe('MVC');
  });

  test('Retorna o valor da flag em maiúsculas sem exibir o prompt', async () => {
    const structureOptions = 'rest';
    const result = await askStruturePrompt(structureOptions);

    expect(inquirer.prompt).not.toHaveBeenCalled();
    
    expect(result).toBe(structureOptions.toUpperCase());
});
});
