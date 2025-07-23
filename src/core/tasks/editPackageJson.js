import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { errorHandler } from '../../utils/index.js';

export const editPackageJson = async (dir, name) => {
    try {
        const packageJson = path.join(dir, 'package.json');
        const content = JSON.parse(await readFile(packageJson, 'utf-8'));
        content.name = name;
        content.description = 'Descrição básica do seu projecto';

        await writeFile(packageJson, JSON.stringify(content, null, 2));
    } catch (err) {
        errorHandler('Falha ao editar o arquivo package.json', err);
    }
};
