import pt from './pt.json' with { type: 'json' };
import en from './en.json' with { type: 'json' };

const languages = { pt, en };

let currentLang = 'pt'; // padrão

export function setLang(lang) {
  if (languages[lang]) {
    currentLang = lang;
  }
}

export function t(key) {
  return languages[currentLang][key] || key;
}
