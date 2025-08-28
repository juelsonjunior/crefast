# 🧰 NodeGen – Gerador de Estrutura para Projetos Node.js

**NodeGen** é uma CLI (Command Line Interface) desenvolvida em Node.js que automatiza a criação de estruturas base para aplicações backend. Com ela, você gera rapidamente projetos organizados nos padrões **REST**, **MVC** e **MODULAR**, com pastas, arquivos e dependências essenciais já configuradas.

---

## ⚙️ Funcionalidades

- 📁 Geração automática de pastas e arquivos padrão (`controllers`, `routes`, `repositorie`, `service`, etc.)
- 📦 Inicialização automática com `npm init`
- 🌱 Suporte a Git (com ou sem inicialização)
- 🧠 Sistema de resolução de conflitos com prompt interativo (renomear, sobrescrever ou cancelar)
- 📝 Geração de metadados do projeto (`.cli-metadata.json`)
- 📄 Templates personalizados com variáveis dinâmicas (ex: `{{projectName}}`, `{{author}}`)

---

## 📦 Estruturas Suportadas

- **REST:** Organização mínima para APIs simples
- **MODULAR:** Arquitetura baseada em controllers repositorie e service para projetos escaláveis

---

## 🚀 Instalação

Você pode rodar diretamente via NPX (não requer instalação global):

```bash
npx nodegen create
```

Ou instalar globalmente:

```bash
npm install -g nodegen
```

---

## 📌 Exemplo de uso

```bash
npx nodegen create
```

## 🧮 Rodar testes

```bash
npm test
```

---

## 👨‍💻 Autor

Desenvolvido por **Juelson Júnior** – apaixonado por tecnologia.

---

## 📄 Licença

Este projeto está sob a licença MIT. 
