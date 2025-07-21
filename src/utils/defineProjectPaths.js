export const defineProjectPaths = (projectName) => {
    const dir = projectName;
    const src = `${dir}/src`;
    const configPath = `${src}/config`;
    const viewsPath = `${src}/views`;
    const modelsPath = `${src}/models`;
    const controllersPath = `${src}/controllers`;
    const repositoriesPath = `${src}/repositorie`;
    const servicesPath = `${src}/service`;
    const routesPath = `${src}/routes`;
    const appPath = `${dir}/app.js`;
    const serverPath = `${dir}/server.js`;
    const gitIgnorePath = `${dir}/.gitignore`;
    const envPath = `${dir}/.env`;
    const envExemplePath = `${dir}/.env.exemple`;
    const readmePath = `${dir}/README.md`;

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
    };
};
