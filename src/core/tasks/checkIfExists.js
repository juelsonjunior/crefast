import { constants } from 'fs';
import { access } from 'fs/promises';

export const checkIfExist = async (path) => {
    try {
        await access(path, constants.F_OK);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};
