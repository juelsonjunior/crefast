import { writeFile, readFile } from 'fs/promises';
import { errorHandler, resolvePathPackage } from '../../utils/index.js';
import path from 'path';
import { t } from '../../i18n/index.js';

export const saveCliMetadata = async (dir, dataAnswers) => {
    const cliPackagePath = resolvePathPackage();
    const filePath = path.join(dir, '.cli-metadata.json');

    try {
        const file = await readFile(cliPackagePath, { encoding: 'utf-8' });
        const cliPkg = JSON.parse(file);

        const metadata = {
            name_project: dataAnswers.safeName,
            git_init: dataAnswers.use_git,
            structure: dataAnswers.structure.toLowerCase(),
            style_code: dataAnswers.use_oop,
            package_manager: dataAnswers.packageManager, 
            cli_author: 'Juelson Júnior',
            cli_verion: cliPkg.version,
            node_verion: process.version,
            platform: process.platform,
            create_at: new Date().toISOString(),
        };

        await writeFile(filePath, JSON.stringify(metadata, null, 2));
        return filePath;
    } catch (err) {
        errorHandler(t('error.metadata.read'), err);
    }
};
