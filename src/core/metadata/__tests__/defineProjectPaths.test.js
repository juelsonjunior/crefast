import { defineProjectPaths } from '../defineProjectPaths.js';

describe('defineProjectPaths', () => {
  test('retorna todos os caminhos corretamente', () => {
    const paths = defineProjectPaths('meuApp');

    expect(paths).toMatchObject({
      dir: 'meuApp',
      configPath: 'meuApp/src/config',
      viewsPath: 'meuApp/src/views',
      modelsPath: 'meuApp/src/models',
      controllersPath: 'meuApp/src/controllers',
      repositoriesPath: 'meuApp/src/repositorie',
      servicesPath: 'meuApp/src/service',
      routesPath: 'meuApp/src/routes',
      appPath: 'meuApp/src/app.js',
      serverPath: 'meuApp/src/server.js',
      gitIgnorePath: 'meuApp/.gitignore',
      envPath: 'meuApp/.env',
      envExemplePath: 'meuApp/.env.exemple',
      readmePath: 'meuApp/README.md',
      prettierPath: 'meuApp/.prettierrc.json',
      eslintPath: 'meuApp/eslint.config.js',
    });
  });

  test('usa o nome do projeto como base', () => {
    const paths = defineProjectPaths('projectXYZ');
    expect(paths.dir).toBe('projectXYZ');
    expect(paths.serverPath).toBe('projectXYZ/src/server.js');
  });
});
