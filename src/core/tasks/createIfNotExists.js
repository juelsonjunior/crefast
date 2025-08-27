import { mkdir, access } from 'fs/promises';
import { constants } from 'fs';

export const createIfNotExists = async (path) => {
    try {
        await access(path, constants.F_OK);
    } catch {
        await mkdir(path, { recursive: true });
    }
    
};
