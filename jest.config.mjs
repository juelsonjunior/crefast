/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  
  // Adicione esta seção
  transform: {
    '^.+\\.m?js$': 'babel-jest',
  },

  transformIgnorePatterns: [
    '/node_modules/(?!chalk).+\\.js$',
  ],

  // Você pode descomentar esta seção para garantir que o Jest
  // procure por arquivos .mjs
  moduleFileExtensions: [
     "js",
     "mjs",
     "cjs",
     "jsx",
     "ts",
     "mts",
     "cts",
     "tsx",
     "json",
     "node"
   ],
};

export default config;