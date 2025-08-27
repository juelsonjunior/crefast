import { createIfNotExists } from '../createIfNotExists.js';
import { mkdir, access } from 'fs/promises';

jest.mock('fs/promises', () => ({
    access: jest.fn(),
    mkdir: jest.fn(),
}));

describe('CreateIfNotExists', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('Nao cria a pasta se o caminho ja existe', async () => {
        access.mockResolvedValue();
        await createIfNotExists('/caminho');
        expect(mkdir).not.toHaveBeenCalled();
    });

    test('Cria a pasta se o caminho nao existe', async () => {
        access.mockRejectedValue(new Error('Nao existe'));
        await createIfNotExists('/caminho');
        expect(mkdir).toHaveBeenCalledWith('/caminho', { recursive: true });
    });
});
