# REFINAMENTO_ARQUITETURA_AUTOMACAO_SELENIUM_JS_JEST.md

## 1) Contexto & Objetivo 🎯
- Construir do zero um **projeto de automação E2E** utilizando:
  - **Selenium WebDriver (JavaScript)**
  - **Cucumber.js** (BDD: Features + Step Definitions)
  - **Jest** (para testes unitários de helpers/factories)
- Padrão arquitetural: **Page Object Model (POM)** com camada de **Elements** separada.
- Entregar **relatórios HTML** de execução (E2E e unit).
- Prover **governança**: ESLint, Husky, Commitlint, `.env`, `.gitignore`.
- Incluir **teste inicial** (smoke) para `https://gadget-shop-complete-xf3n.bolt.host/`.

## 2) Escopo (MVP) ✅
1. Bootstrapping de projeto Node.js (ESM) com dependências e scripts **prontos**.
2. Estrutura de diretórios para **config**, **pages**, **elements**, **features**, **steps**, **helpers**, **factories**, **reports**.
3. **Configurações** centrais (timeout, baseUrl, browser, headless) lidas de `.env`.
4. **Hooks globais** do Cucumber (Before/After) com criação/encerramento do driver e screenshot on failure.
5. **Factories** com dados fictícios (ex.: usuário).
6. **Helpers** (esperas/asserts utilitários).
7. **Relatórios HTML**:
   - Cucumber (multiple-cucumber-html-reporter).
   - Jest (jest-html-reporters).
8. **Qualidade**: ESLint (Airbnb Base) + Husky (pre-commit) + Commitlint (commit-msg).
9. **Teste de exemplo** acessando a Home e validando carregamento e algum card de produto.

## 3) Requisitos Não Funcionais ⚙️
- Node LTS (>= 18).
- Execução **headless** por padrão, configurável.
- Paralelização simples desabilitada no início (1 thread) para estabilidade.
- Artefatos devem ser gerados em `reports/**`.
- Seletores resilientes e centralizados em **Elements**.
- Sem dados sensíveis commitados (usar `.env`).

## 4) Estrutura de Pastas (contrato) 📂
A IA deve gerar exatamente esta árvore (arquivos vazios onde indicado) e popular os que têm **Contrato de Conteúdo** abaixo:

```
.
├─ .husky/
│  ├─ pre-commit
│  └─ commit-msg
├─ .vscode/
│  └─ settings.json
├─ reports/
│  ├─ cucumber/              # JSON + HTML
│  ├─ jest/                  # HTML unit
│  └─ screenshots/           # imagens de falha
├─ src/
│  ├─ config/
│  │  ├─ env.js
│  │  ├─ selenium.js
│  │  ├─ cucumber.js
│  │  └─ jest.setup.js
│  ├─ data/
│  │  └─ factories/
│  │     └─ userFactory.js
│  ├─ helpers/
│  │  ├─ wait.js
│  │  └─ assert.js
│  ├─ elements/
│  │  └─ home.elements.js
│  ├─ pages/
│  │  ├─ base.page.js
│  │  └─ home.page.js
│  └─ tests/
│     ├─ features/
│     │  └─ home.feature
│     └─ step-definitions/
│        └─ home.steps.js
├─ __tests__/
│  └─ userFactory.test.js
├─ tools/
│  └─ cucumber-html-report.js
├─ .commitlintrc.cjs
├─ .editorconfig
├─ .env.example
├─ .eslintignore
├─ .eslintrc.cjs
├─ .gitignore
├─ cucumber.js
├─ jest.config.cjs
├─ package.json
└─ README.md
```

## 5) Dependências (versões mínimas sugeridas) 📦
**Produção/dev**:
- `selenium-webdriver` ^4.24.0
- `@cucumber/cucumber` ^11.3.0
- `jest` ^29.7.0
- `dotenv` ^16.4.5
- `@faker-js/faker` ^9.0.0
- `multiple-cucumber-html-reporter` ^3.7.0
- `jest-html-reporters` ^3.1.7
- `husky` ^9.1.6
- `commitlint` ^18.6.3
- `@commitlint/config-conventional` ^18.6.3
- `eslint` ^9.9.0
- `eslint-config-airbnb-base` ^15.0.0
- `eslint-plugin-import` ^2.30.0
- Drivers (ambiente): **chromedriver** (para Chrome) ou **geckodriver** (para Firefox) instalados no OS/CI.

## 6) Padrões & Convenções 🧭
- **ESM** ( `"type": "module"` no `package.json` ).
- **Naming**:
  - Pages: `*.page.js`
  - Elements: `*.elements.js`
  - Steps: `*.steps.js`
  - Factories: `*Factory.js`
  - Helpers: nome descritivo (ex.: `wait.js`, `assert.js`)
- **Selectors** apenas na camada **Elements**.
- **Ações/fluxos** de UI apenas na camada **Pages**.
- **Steps** devem orquestrar **o que** fazer (delegar **como** às Pages).
- **Timeouts** e **URL** somente via `config/env.js` (carregando `.env`).

## 7) Variáveis de Ambiente (.env) 🌱
Gerar `.env.example` com chaves:
- `BASE_URL=https://gadget-shop-complete-xf3n.bolt.host`
- `BROWSER=chrome` (opções: `chrome`, `firefox`, `edge`)
- `HEADLESS=true` (`true|false`)
- `DEFAULT_TIMEOUT=30000` (ms)

**Regras**:
- `.env` real no `.gitignore`.
- `src/config/env.js` expõe objeto `config` com defaults.

Sempre exibir os detalhes

## 8) Integração Contínua & Entrega Contínua (CI/CD com GitHub Actions) ⚡

O projeto deve possuir pipeline de CI/CD configurado no **GitHub Actions**, garantindo:

1. **Validação de qualidade e padronização de commits**  
   - Executar `eslint` para validar o código.  
   - Garantir que os commits sigam o padrão **Conventional Commits** (via Commitlint).  

2. **Execução automatizada de testes**  
   - **Unitários (Jest)** em paralelo.  
   - **E2E (Cucumber + Selenium)** em modo headless.  
   - Geração de relatórios HTML como artefatos.  

3. **Publicação de artefatos**  
   - Relatórios HTML de Cucumber (`reports/cucumber/html`) e Jest (`reports/jest/index.html`) devem ser disponibilizados como artifacts de build.  
   - Screenshots de falhas em `reports/screenshots` também devem ser coletados.  

4. **Ambientes e drivers**  
   - Rodar com **Node LTS (20.x)**.  
   - Usar **headless** por padrão (`HEADLESS=true`).  
   - Instalar **Chrome** e **chromedriver** no ambiente CI.  