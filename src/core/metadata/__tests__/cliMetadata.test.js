import { saveCliMetadata } from '../cliMetadata.js';
import { errorHandler, resolvePathPackage } from '../../../utils/index.js';
import { readFile, writeFile } from 'fs/promises';

jest.mock('fs/promises', () => ({
    readFile: jest.fn(),
    writeFile: jest.fn(),
}));

jest.mock('../../../utils/index.js', () => ({
    errorHandler: jest.fn(),
    resolvePathPackage: jest.fn(),
}));

describe('saveCliMetadata', () => {
    const fakeDir = '/fake/project';
    const fakeAnswers = {
        safeName: 'meuApp',
        structure: 'MVC',
        use_git: true,
        use_oop: 'oop',
        packageManager: 'npm',
    };

    beforeEach(() => {
        jest.clearAllMocks();
        resolvePathPackage.mockReturnValue('/fake/path/to/cli/package.json');
    });

    test('Salva metadata corretamente', async () => {
        // Simulando package.json da CLI
        readFile.mockResolvedValue(JSON.stringify({ version: '1.2.3' }));

        const result = await saveCliMetadata(fakeDir, fakeAnswers);

        expect(readFile).toHaveBeenCalledWith(
            '/fake/path/to/cli/package.json',
            { encoding: 'utf-8' }
        );
        expect(writeFile).toHaveBeenCalled();

        const [filePath, writtenContent] = writeFile.mock.calls[0];
        const parsed = JSON.parse(writtenContent);

        expect(filePath).toBe(`${fakeDir}/.cli-metadata.json`);
        expect(parsed).toMatchObject({
            name_project: 'meuApp',
            structure: 'mvc',
            style_code: 'oop',
            git_init: true,
            package_manager: 'npm',
            cli_verion: '1.2.3',
            node_verion: process.version,
            platform: process.platform,
            cli_author: 'Juelson Júnior',
        });

        expect(result).toBe(`${fakeDir}/.cli-metadata.json`);
    });

    test('Chama errorHandler em caso de erro', async () => {
        readFile.mockRejectedValue(new Error('Falha de leitura'));

        await saveCliMetadata(fakeDir, fakeAnswers);

        expect(errorHandler).toHaveBeenCalledWith(
            'Não foi possível ler o package.json do CLI',
            expect.any(Error)
        );
    });
});
