# Tech Stack e Dependências

Este documento detalha as tecnologias e dependências que formam a base deste projeto, um SPA (Single Page Application) construído com React e Vite. As dependências estão divididas entre aquelas necessárias para a aplicação em produção e aquelas utilizadas apenas durante o desenvolvimento.

---

## Dependências de Produção (Build)

Bibliotecas que são incluídas no build final e executadas no navegador do usuário.

### Core & Estrutura

-   **React:** Biblioteca principal para a construção de interfaces de usuário reativas e componentizadas.
-   **Vite:** Plugin oficial que permite o uso do Vite para compilar e otimizar projetos React com suporte a HMR (Hot Module Replacement) e outras otimizações.
-   **vite-tsconfig-paths:** Plugin para o Vite que permite o uso de `paths` definidos no `tsconfig.json`, simplificando os imports de módulos.
-   **babel-plugin-react-compiler:** Compilador experimental do React (Forget) que otimiza automaticamente o código dos componentes para melhorar a performance, eliminando a necessidade de memoização manual.

### Roteamento

-   **@tanstack/react-router:** Solução de roteamento moderna e "type-safe" para SPAs, com funcionalidades avançadas como pre-fetching e integração com gerenciadores de estado.
-   **@tanstack/router-plugin:** Plugin para o Vite/Webpack que gera automaticamente a árvore de rotas, garantindo a tipagem e eliminando a necessidade de configuração manual.

### Gerenciamento de Dados e Estado

-   **@tanstack/react-query:** Biblioteca para data-fetching, cache, e sincronização de dados do servidor, simplificando a lógica de carregamento e atualização de informações.
-   **axios:** Cliente HTTP baseado em Promises para fazer requisições a APIs de forma simples e poderosa.
-   **immer:** Utilitário para trabalhar com estado imutável de forma mais fácil e intuitiva, usando a sintaxe de mutação direta.
-   **zod:** Biblioteca para validação de esquemas e tipagem, garantindo que os dados (ex: respostas de API, formulários) estejam no formato esperado.

### UI & Componentes

-   **@base-ui/react:** Biblioteca de componentes "headless" (não estilizados) e acessíveis da MUI, que serve como base para a construção de sistemas de design customizados.
-   **lucide-react:** Pacote de ícones SVG elegante, leve e altamente customizável.
-   **sonner:** Biblioteca para exibir notificações (toasts) de forma elegante e simples.
-   **input-otp:** Componente React para campos de input de senhas de uso único (One-Time Passwords).
-   **react-markdown:** Componente para renderizar Markdown como componentes React de forma segura.

### Estilização e Animação

-   **tailwindcss:** Framework CSS "utility-first" que permite a criação de designs customizados diretamente no HTML/JSX sem escrever CSS tradicional.
-   **tailwind-merge:** Utilitário para mesclar classes do Tailwind CSS de forma inteligente, evitando conflitos de estilo.
-   **clsx:** Utilitário para construir strings de `className` de forma condicional e concisa.

### Utilitários e Diversos

-   **dayjs:** Biblioteca minimalista para manipulação, validação e formatação de datas e horas.
-   **web-vitals:** Biblioteca do Google para medir e reportar as métricas de performance da página (Core Web Vitals).
-   **@react-oauth/google:** Facilita a integração com o login do Google em aplicações React.

### Observabilidade e Monitoramento

-   **@sentry/react:** SDK para monitoramento de erros e performance em aplicações React, ajudando a identificar e diagnosticar problemas em produção.
-   **@sentry/vite-plugin:** Plugin para o Vite que automatiza o upload de source maps para o Sentry, permitindo um debugging mais preciso dos erros.

---

## Dependências de Desenvolvimento

Ferramentas e bibliotecas usadas apenas no ambiente de desenvolvimento para testes, qualidade de código e automação.

### Testes

-   **vitest:** Framework de testes unitários e de integração extremamente rápido, com ambiente de execução nativo para Vite.
-   **@vitest/browser-playwright:** Permite que o Vitest execute testes diretamente em um ambiente de navegador real, utilizando o Playwright.
-   **playwright:** Ferramenta de automação de navegador que possibilita testes end-to-end e de integração robustos.

### Qualidade e Análise de Código

-   **typescript:** Adiciona tipagem estática ao JavaScript para aumentar a robustez e manutenibilidade do código.
-   **@biomejs/biome:** Ferramenta de alta performance para formatação (formatter) e análise estática (linter) de código, garantindo um padrão consistente.
-   **vite-plugin-inspect:** Plugin para inspecionar o estado intermediário de outros plugins do Vite, útil para debugging.
-   **rollup-plugin-visualizer:** Gera um gráfico interativo do bundle final, ajudando a identificar o que está ocupando mais espaço.

### Storybook (Documentação de Componentes)

-   **storybook:** Ferramenta para desenvolver e documentar componentes de UI de forma isolada, criando um "catálogo" interativo.
-   **@storybook/*:** Conjunto de addons que adicionam funcionalidades ao Storybook, como testes de acessibilidade (`a11y`), temas (`themes`), integração com Vitest (`addon-vitest`), etc.
-   **@chromatic-com/storybook:** Ferramenta para testes visuais e de regressão automatizados, integrada ao Storybook.
-   **storybook-addon-tag-badges:** Adiciona badges customizáveis às stories para melhor organização e sinalização.

### Tipagens

-   **@types/*:** Pacotes que fornecem as definições de tipo do TypeScript para bibliotecas que foram escritas em JavaScript puro.
