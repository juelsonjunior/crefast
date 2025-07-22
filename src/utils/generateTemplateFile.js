import { readFile } from 'fs/promises';
import ejs from 'ejs';

export const generateTemplateFile = async (templatePath, variables = {}) => {
    const template = await readFile(templatePath, 'utf-8');
    return ejs.render(template, variables);
};
