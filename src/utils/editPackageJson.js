import chalk from 'chalk';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

export const editPackageJson = async (dir, name) => {
    const packageJson = path.join(dir, 'package.json');
    try {
        const content = JSON.parse(await readFile(packageJson, 'utf-8'));
        content.name = name;
        content.description = 'Descrição básica do seu projecto';

        await writeFile(packageJson, JSON.stringify(content, null, 2));
    } catch (err) {
        console.error(
            chalk.red('❌ Falha ao editar o arquivo package.json:', err.message)
        );
        throw err;
    }
};
