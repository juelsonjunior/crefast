export const defineProjectPaths = (projectName) => {
    //Folders
    const dir = projectName;
    const src = `${dir}/src`;
    const configPath = `${src}/config`;
    const viewsPath = `${src}/views`;
    const modelsPath = `${src}/models`;
    const controllersPath = `${src}/controllers`;
    const repositoriesPath = `${src}/repositorie`;
    const servicesPath = `${src}/service`;
    const routesPath = `${src}/routes`;

    //Files
    const appPath = `${src}/app.js`;
    const serverPath = `${src}/server.js`;
    const gitIgnorePath = `${dir}/.gitignore`;
    const envPath = `${dir}/.env`;
    const envExemplePath = `${dir}/.env.exemple`;
    const readmePath = `${dir}/README.md`;
    const prettierPath = `${dir}/.prettierrc.json`;
    const eslintPath = `${dir}/eslint.config`;

    return {
        dir,
        configPath,
        viewsPath,
        modelsPath,
        controllersPath,
        repositoriesPath,
        servicesPath,
        routesPath,
        appPath,
        serverPath,
        gitIgnorePath,
        envPath,
        envExemplePath,
        readmePath,
        prettierPath,
        eslintPath,
    };
};
