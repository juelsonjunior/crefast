import { structureBuilder } from '../structureBuilder.js';
import fs from 'fs/promises';
import chalk from 'chalk';
import { errorHandler } from '../../../utils/index.js';

jest.mock('fs/promises', () => ({
    stat: jest.fn(),
}));
jest.mock('../../../utils/index.js', () => ({
    errorHandler: jest.fn(),
}));
jest.mock('path', () => ({
    ...jest.requireActual('path'),
    relative: jest.fn(() => 'fake/file.js'),
}));
jest.spyOn(console, 'log').mockImplementation(() => {});

describe('structureBuilder', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('executa os steps e loga sucesso', async () => {
        const fakeStep = {
            action: jest.fn().mockResolvedValue('/fake/file.js'),
        };
        fs.stat.mockResolvedValue({ size: 123 });

        await structureBuilder([fakeStep], {});

        expect(fakeStep.action).toHaveBeenCalled();
        expect(fs.stat).toHaveBeenCalledWith('/fake/file.js');
        expect(console.log).toHaveBeenCalledWith(
            `${chalk.green('✅ CRIAR')} fake/file.js (123 bytes)`
        );
    });

    test('chama errorHandler se fs.stat falhar', async () => {
        const fakeStep = {
            action: jest.fn().mockResolvedValue('/fake/file.js'),
        };
        fs.stat.mockRejectedValue(new Error('fail'));

        await structureBuilder([fakeStep], {});

        expect(errorHandler).toHaveBeenCalledWith(
            'Erro ao obter informações','/fake/file.js',
            expect.any(Error)
        );
    });
});
