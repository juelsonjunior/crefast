import { writeFile, readFile } from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cliPackagePath = path.resolve(__dirname, '../../../package.json');

export const saveCliMetadata = async (dir, dataAnswers) => {
    const filePath = path.join(dir, '.cli-metadata.json');

    let cliPkg;

    try {
        const file = await readFile(cliPackagePath, { encoding: 'utf-8' });
        cliPkg = JSON.parse(file);
    } catch (err) {
        throw new Error(
            `Não foi possível ler o package.json da CLI: ${err.message}`
        );
    }

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
};
