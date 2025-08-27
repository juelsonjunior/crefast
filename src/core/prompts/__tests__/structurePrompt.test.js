import { askStruturePrompt } from '../structurePrompt.js';
import inquirer from 'inquirer';

jest.mock('inquirer', () => ({
  prompt: jest.fn(),
}));

describe('structurePrompt', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna estrutura em maiúsculas', async () => {
    inquirer.prompt.mockResolvedValue({ structure: 'mvc' });

    const result = await askStruturePrompt(false);

    expect(result).toBe('MVC');
  });
});
