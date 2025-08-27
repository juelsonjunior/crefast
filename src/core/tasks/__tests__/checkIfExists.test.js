import { checkIfExist } from '../checkIfExists';
import { access } from 'fs/promises';

jest.mock('fs/promises', () => ({
    access: jest.fn(),
}));

describe('checkIfExists', () => {
    test('Retorna true se  arquivo existir', async () => {
        access.mockResolvedValue();

        const result = await checkIfExist('/pasta/arquivo.js');
        expect(result).toBe(true);
    });

    test('Retorna false se o arquivo não existir', async () => {
        access.mockRejectedValue(new Error('Nao existe'));

        const result = await checkIfExist('/pasta/arquivo.js');
        expect(result).toBe(false);
    });
});
