# 📝 Gestão de Variáveis de Ambiente

Este documento detalha como as variáveis de ambiente são gerenciadas neste projeto, utilizando o sistema de **modos** do Vite.

## ⚙️ Como Funciona

O Vite carrega variáveis de ambiente de arquivos `.env` específicos com base no modo (`mode`) em que o aplicativo é executado (por exemplo, `development`, `production`, `test`).

Quando você inicia o aplicativo ou executa um build com um modo específico, o Vite procura e carrega os seguintes arquivos na ordem listada:

1.  `.env` (carregado em todos os modos)
2.  `.env.local` (carregado em todos os modos, ignorado pelo Git)
3.  `.env.[mode]` (carregado apenas no modo especificado)
4.  `.env.[mode].local` (carregado apenas no modo especificado, ignorado pelo Git)

### 📈 Ordem de Prioridade

As variáveis definidas nos arquivos mais à direita na lista **sobrescrevem** as dos arquivos à esquerda. No entanto, as variáveis que já existem e não são sobrescritas são mantidas.

**Exemplo para o modo `dev`:**

Os seguintes arquivos serão carregados em ordem de prioridade crescente:

1.  `.env`
2.  `.env.local`
3.  `.env.dev`
4.  `.env.dev.local`

Se uma variável `VITE_API_URL` for definida em `.env` e redefinida em `.env.dev`, o valor de `.env.dev` será utilizado.

## 🗂️ Modos do Projeto

Neste projeto, existem três modos principais, que correspondem diretamente às branches do Git:

-   `prod`: Modo de produção.
-   `staging`: Modo de homologação.
-   `dev`: Modo de desenvolvimento.

O nome do modo é passado como um argumento de build no Docker, utilizando o nome da branch atual. A única exceção é a branch `main`, que é convertida para o modo `prod`.

Com base nisso, os arquivos de ambiente específicos que podem ser criados (ignorando as variações `.local`) são:

-   `.env.prod`
-   `.env.staging`
-   `.env.dev`

## 🔒 Dados Sensíveis e Arquivos `.local`

Para evitar expor chaves de API, senhas ou outros dados sensíveis no repositório, utilize os arquivos com sufixo `.local`.

-   `.env.local`
-   `.env.[mode].local`

Esses arquivos são **ignorados** pelo Git (via `.gitignore`) e pelo Docker (via `.dockerignore`), garantindo que informações confidenciais permaneçam apenas no seu ambiente de desenvolvimento local.