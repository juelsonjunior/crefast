import { t, setLang } from '../index.js';

import pt from '../pt.json';
import en from '../en.json';

afterEach(() => {
    setLang('pt');
});

describe('i18n', () => {
    test('Deve traduzir a chave para o idioma padrão (pt)', () => {
        const translatedString = t('cli.description');
        expect(translatedString).toBe(pt['cli.description']);
    });

    test('Deve traduzir a chave para o idioma selecionado (en)', () => {
        setLang('en');

        const translatedString = t('cli.description');
        expect(translatedString).toBe(en['cli.description']);
    });

    test('Não deve alterar o idioma se o idioma fornecido não for suportado', () => {
        setLang('es');

        const translatedString = t('cli.description');
        expect(translatedString).toBe(pt['cli.description']);
    });

    test('Deve retornar a chave se a tradução não for encontrada no idioma atual', () => {
        setLang('en');

        const key = 'fake.key';
        const translatedString = t(key);
        expect(translatedString).toBe(key);
    });

    test('Deve retornar a chave se a tradução não for encontrada mesmo em pt', () => {
        setLang('pt');

        const key = 'fake.key';
        const translatedString = t(key);
        expect(translatedString).toBe(key);
    });
});
