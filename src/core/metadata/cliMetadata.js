import { writeFile } from 'fs/promises';
import path from 'path';

export const saveCliMetadata = async (dir, structure) => {
    const filePath = path.join(dir, '.cli-config.json');

    const metadata = {
        structure: structure.toLowerCase(),
        createAt: new Date().toISOString(),
        author: 'Juelson Júnior',
    };

    await writeFile(filePath, JSON.stringify(metadata, null, 2));
};
