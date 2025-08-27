import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { errorHandler } from '../../utils/index.js';

export const editPackageJson = async (dir, serverBase, name) => {
    try {
        const packageJson = path.join(dir, 'package.json');
        const content = JSON.parse(await readFile(packageJson, 'utf-8'));
        content.name = name;
        content.description = 'Breve descrição sobre o seu projecto';
        content.type = 'module';

        const mainFile = path.basename(serverBase);
        content.main = `src/${mainFile}`;
        content.scripts = {
            ...(content.scripts || {}),
            dev: `nodemon src/${mainFile}`,
        };

        await writeFile(packageJson, JSON.stringify(content, null, 2));
    } catch (err) {
        errorHandler('Falha ao editar o arquivo package.json', err);
    }
};
