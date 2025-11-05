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

2.  **Instale as dependências** (recomenda-se usar `bun`):

    ```bash
    bun install
    ```

3.  **Inicie o servidor de desenvolvimento:**

    ```bash
    bun run dev
    ```

4.  **Abra o navegador:** Acesse [http://localhost:3000](http://localhost:3000) (ou a porta indicada no terminal).

## 📜 Scripts Disponíveis

  - `bun run dev`: Inicia o servidor de desenvolvimento com Vite.
  - `bun run build`: Gera a build de produção da aplicação.
  - `bun run serve`: Serve a build de produção localmente para testes.
  - `bun run lint`: Executa o linter do Biome para encontrar problemas no código.
  - `bun run format`: Formata todo o código do projeto com o Biome.
  - `bun run check`: Executa o `lint`, `format` e `tsc` (checagem de tipos) em um único comando.
  - `bun run test`: Roda os testes configurados com Vitest.
  - `bun run optimize-images`: Otimiza as imagens no diretório `public/images`.

## 📁 Estrutura de Pastas

A estrutura de pastas é organizada para ser intuitiva e escalável, com foco em módulos.

```
.
├── public/                # Arquivos estáticos (imagens, fontes)
├── scripts/               # Scripts de automação (otimização de imagens, etc.)
└── src/
    ├── components/        # Componentes de UI genéricos e reutilizáveis
    ├── core/              # Lógica de negócio central (rotas, chaves de query)
    ├── hooks/             # Hooks customizados reutilizáveis
    ├── lib/               # Configuração de bibliotecas (axios, queryClient)
    ├── modules/           # Módulos de features (auth, theme, form)
    ├── routes/            # Definições de rota do TanStack Router (File-Based Routing)
    │   ├── __root.tsx     # Rota raiz (layout principal da aplicação)
    │   └── index.tsx      # Rota para a página inicial ('/')
    ├── schemas/           # Esquemas de validação com Zod
    ├── types/             # Tipos e interfaces globais
    ├── utils/             # Funções utilitárias genéricas
    └── main.tsx           # Ponto de entrada da aplicação
```

  - **`src/routes`**: O coração da aplicação. O TanStack Router usa os arquivos nesta pasta para criar as rotas automaticamente. O arquivo `__root.tsx` define o layout global.
  - **`src/modules`**: Cada pasta representa uma "feature" da aplicação (ex: autenticação), contendo seus próprios componentes, APIs, e lógica de estado.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](https://www.google.com/search?q=LICENSE) para mais detalhes.
