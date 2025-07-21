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
    const appPath = `${src}/app.js`;
    const serverPath = `${src}/server.js`;
    const gitIgnorePath = `${src}/.gitignore`;
    const envPath = `${src}/.env`;
    const envExemplePath = `${src}/.env.exemple`;
    const readmePath = `${src}/README.md`;

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
