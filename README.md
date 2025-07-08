# React Template Moderno 2025

[](https://opensource.org/licenses/MIT)
[](http://makeapullrequest.com)
[](https://react.dev/)
[](https://vitejs.dev/)

Um template opinativo e pronto para produção para criar aplicações web modernas com React 19 e Vite. Focado em performance, type-safety e na melhor experiência de desenvolvimento (DX) possível.

## ✨ Features

  - **Framework Moderno:** Construído com **React 19** e **Vite 7**, garantindo a melhor performance e acesso às features mais recentes.
  - **Roteamento Type-Safe:** Roteamento baseado em arquivos com **TanStack Router**, oferecendo total segurança de tipos, loaders de dados e gerenciamento de estado de busca.
  - **Gerenciamento de Estado de Servidor:** **TanStack Query** pré-configurado para data-fetching, cache e sincronização de dados de forma eficiente.
  - **Formulários Poderosos:** Criação de formulários performáticos e 100% type-safe com **TanStack Form**.
  - **Tooling Unificado:** **Biome** para formatação e linting. Rápido, simples e sem a necessidade de configurar ESLint e Prettier separadamente.
  - **Estilização Atômica:** **Tailwind CSS 4** com o novo motor JIT do Vite para uma experiência de estilização rápida e intuitiva.
  - **Componentes Prontos:** Inclui componentes de UI pré-construídos para estados comuns: `Erro`, `Não Encontrado` e `Splash Screen`.
  - **SEO e Metadados:** Gerenciamento de tags `<head>` integrado ao roteador, permitindo metadados dinâmicos e por rota de forma simples.

## 🚀 Tecnologias Inclusas

Este template integra uma seleção cuidadosa das melhores ferramentas do ecossistema React.

| Categoria                  | Tecnologia                                                                         |
| -------------------------- | ---------------------------------------------------------------------------------- |
| **Core & Build** | `React 19`, `Vite 7`, `TypeScript`                                                 |
| **Roteamento & Dados** | `TanStack Router`, `TanStack Query`, `TanStack Form`, `Axios`                      |
| **Estilização & UI** | `Tailwind CSS 4`, `Lucide React` (Ícones), `Sonner` (Notificações)                 |
| **Validação & Utilitários**| `Zod`, `Day.js`, `js-cookie`, `clsx`, `tailwind-merge`                             |
| **Tooling & Qualidade** | `Biome` (Lint & Format), `Vitest` (Testes), `Rollup Visualizer` (Análise de Bundle) |

## ⚡ Começando

Para usar este template, a maneira mais fácil é através do botão **"Use this template"** no topo da página do GitHub.

Se preferir fazer manualmente:

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
    cd SEU_REPOSITORIO
    ```

2.  **Instale as dependências** (recomenda-se usar `npm` ou `pnpm`):

    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

4.  **Abra o navegador:** Acesse [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) (ou a porta indicada no terminal).

## 📜 Scripts Disponíveis

  - `npm run dev`: Inicia o servidor de desenvolvimento com Vite.
  - `npm run build`: Gera a build de produção da aplicação.
  - `npm run serve`: Serve a build de produção localmente para testes.
  - `npm run lint`: Executa o linter do Biome para encontrar problemas no código.
  - `npm run format`: Formata todo o código do projeto com o Biome.
  - `npm run check`: Executa o `lint`, `format` e `tsc` (checagem de tipos) em um único comando.
  - `npm test`: Roda os testes configurados com Vitest.

## 📁 Estrutura de Pastas

A estrutura de pastas é organizada para ser intuitiva e escalável.

```
.
├── public/                # Arquivos estáticos
└── src/
    ├── components/        # Componentes reutilizáveis (UI, etc.)
    │   ├── ErrorDisplay.tsx
    │   ├── NotFound.tsx
    │   └── SplashScreen.tsx
    ├── lib/                 # Utilitários, hooks, etc.
    ├── routes/              # Definições de rota (File-Based Routing)
    │   ├── __root.tsx       # Rota raiz (layout principal da aplicação)
    │   ├── index.tsx        # Rota para a página inicial ('/')
    │   └── info/
    │       └── index.tsx    # Rota para a página '/info'
    └── main.tsx             # Ponto de entrada da aplicação
```

  - **`src/routes`**: O coração da aplicação. O TanStack Router usa os arquivos nesta pasta para criar as rotas automaticamente. O arquivo `__root.tsx` define o layout global, incluindo `<body>`, `<head>`, e onde as rotas filhas serão renderizadas (`<Outlet />`).

## 🤝 Contribuição

Contribuições são muito bem-vindas\! Se você tem alguma sugestão para melhorar este template:

1.  Faça um **Fork** do projeto.
2.  Crie uma nova **Branch** (`git checkout -b feature/sua-feature`).
3.  Faça o **Commit** das suas alterações (`git commit -m 'feat: Adiciona sua feature'`).
4.  Faça o **Push** para a Branch (`git push origin feature/sua-feature`).
5.  Abra um **Pull Request**.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](https://www.google.com/search?q=LICENSE) para mais detalhes.
