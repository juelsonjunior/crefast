import { constants } from 'fs';
import { access } from 'fs/promises';

export const checkIfExist = async (path) => {
    try {
        await access(path, constants.F_OK);
        return true;
        // eslint-disable-next-line no-unused-vars
    } catch (err) {
        return false;
    }
};
