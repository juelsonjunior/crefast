import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const resolvePathTemplate = (...segments) => {
    return resolve(__dirname, '..', '..', 'templates', ...segments);
};

export const resolvePathPackage = () => {
    return resolve(__dirname, '..', '..', 'package.json');
};
