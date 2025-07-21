import { mkdir, writeFile, access } from 'fs/promises';
import { constants } from 'fs';

export const createIfNotExists = async (path, type = 'dir', content = '') => {
    try {
        await access(path, constants.F_OK);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
        if (type === 'dir') {
            await mkdir(path, { recursive: true });
        } else {
            await writeFile(path, content);
        }
    }
};
