import { writeFile, readFile } from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const saveCliMetadata = async (dir, dataAnswers) => {
    const filePath = path.join(dir, '.cli-metadata.json');

    const cliPkg = JSON.parse(
        await readFile(path.join(__dirname, '../../package.json'), 'utf-8')
    );

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
