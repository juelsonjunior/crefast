import ora from 'ora';

export const runWithSpinner = async (text, task) => {
    if (!text) return await task();

    const spinner = ora(text).start();

    try {
        const result = await task();
        spinner.succeed(`✅ ${text}`);

        return result;
    } catch (err) {
        spinner.fail(`❌ ${text}`);
        throw err;
    }
};
