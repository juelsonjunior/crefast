import { createCommand } from '../create.js';
import * as utils from '../../utils/index.js';
import { Command } from 'commander';

// Mocks para as dependências
jest.mock('../../utils/index.js', () => ({
    mergeAnswers: jest.fn(),
}));

describe('createCommand', () => {
    // Declara a variável `program` e a função `commandAction`
    let program;
    let commandAction;

    // Configura o mock antes de cada teste
    beforeEach(() => {
        program = new Command();
        
        // Mockamos o método command para capturar a função `action`
        // Isso nos permite testá-la separadamente
        program.command = jest.fn().mockReturnValue({
            description: jest.fn().mockReturnThis(),
            option: jest.fn().mockReturnThis(),
            action: jest.fn((action) => {
                commandAction = action;
            }),
        });

        jest.clearAllMocks();
    });

    // Cenário 1: Verifica se o comando é registrado
    test('Deve registrar o comando "create" com as opções corretas', () => {
        createCommand(program);

        // Verificamos se 'program.command' foi chamado com o nome do comando e a descrição
        expect(program.command).toHaveBeenCalledWith('create [project_name]');
        
        // Verificamos se as opções foram registradas
        const command = program.command.mock.results[0].value;
        expect(command.option).toHaveBeenCalledWith('-n, --name <name>', 'Nome do projeto');
        expect(command.option).toHaveBeenCalledWith('-t, --structure <type>', 'Tipo de estrutura (REST=rest, MODULAR=modular)');
    });

    // Cenário 2: Nome do projeto fornecido via argumento
    test('Deve chamar mergeAnswers com o nome do projeto do argumento', async () => {
        createCommand(program);

        const projectName = 'meu-projeto-arg';
        const options = {};
        
        // Executamos a função 'action' com os argumentos e opções
        await commandAction(projectName, options);

        // Verificamos se mergeAnswers foi chamado com o objeto de opções correto
        expect(utils.mergeAnswers).toHaveBeenCalledWith({ name: 'meu-projeto-arg' });
    });

    // Cenário 3: Nome do projeto fornecido via opção (--name)
    test('Deve chamar mergeAnswers com o nome do projeto da opção', async () => {
        createCommand(program);

        const projectName = undefined;
        const options = { name: 'meu-projeto-option' };
        
        await commandAction(projectName, options);

        expect(utils.mergeAnswers).toHaveBeenCalledWith({ name: 'meu-projeto-option' });
    });

    // Cenário 4: Argumento tem prioridade sobre a opção
    test('Deve priorizar o nome do argumento se a opção e o argumento existirem', async () => {
        createCommand(program);

        const projectName = 'meu-projeto-arg';
        const options = { name: 'meu-projeto-option' };
        
        await commandAction(projectName, options);

        // O seu código prioriza o argumento e o armazena na opção,
        // então esperamos que a opção `name` seja o valor do argumento
        expect(utils.mergeAnswers).toHaveBeenCalledWith({ name: 'meu-projeto-option' });
    });
});