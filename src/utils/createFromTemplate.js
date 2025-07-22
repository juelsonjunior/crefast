import { dirname } from 'path';
import { mkdir, writeFile } from 'fs/promises';
import { generateTemplateFile } from './generateTemplateFile.js';

export const createFromTemplate = async (
    templatePath,
    destintionPath,
    variables = {}
) => {
    const folder = dirname(destintionPath);
    await mkdir(folder, { recursive: true });

    const content = await generateTemplateFile(templatePath, variables);
    await writeFile(destintionPath, content);
};
