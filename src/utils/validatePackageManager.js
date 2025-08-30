import { execa } from 'execa';
import { t } from '../i18n/index.js';
import { errorHandler } from './errorHandler.js';

export const validatePackageManager = async (packageManager) => {
    try {
        await execa(packageManager, ['--version']);
    } catch (err) {
        errorHandler(`${t('error.package.not.exist1')} ${packageManager} 
${t('error.package.not.exist2')} ${packageManager} --version`, err);
    }
};
