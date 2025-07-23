import { writeFile, readFile } from 'fs/promises';
import { errorHandler, resolvePathPackage } from '../../utils/index.js';
import path from 'path';

export const saveCliMetadata = async (dir, dataAnswers) => {
    const cliPackagePath = resolvePathPackage();
    const filePath = path.join(dir, '.cli-metadata.json');

    try {
        const file = await readFile(cliPackagePath, { encoding: 'utf-8' });
        const cliPkg = JSON.parse(file);

        const metadata = {
            name_project: dataAnswers.safeName,
            structure: dataAnswers.structure.toLowerCase(),
            authorCLI: 'Juelson Júnior',
            createAt: new Date().toISOString(),
            cli_verion: cliPkg.version,
            node_verion: process.version,
            platform: process.platform,
        };

        await writeFile(filePath, JSON.stringify(metadata, null, 2));
    } catch (err) {
        errorHandler('Não foi possível ler o package.json da CLI', err);
    }
};
