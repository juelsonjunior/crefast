import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminhos relativos ao arquivo atual
const ptPath = path.join(__dirname, 'pt.json');
const enPath = path.join(__dirname, 'en.json');

const pt = JSON.parse(fs.readFileSync(ptPath, 'utf-8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

const languages = { pt, en };
let currentLang = 'pt';

export function setLang(lang) {
  if (languages[lang]) {
    currentLang = lang;
  }
}

export function t(key) {
  return languages[currentLang][key] ?? key;
}
