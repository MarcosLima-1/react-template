## 🐳 Documentação do Ambiente de Desenvolvimento: Docker e Dev Containers

Neste projeto, utilizamos **Docker** de forma abrangente para **tudo**: rodar testes, construir o ambiente de produção e, crucialmente, estabelecer um **ambiente de desenvolvimento isolado** através dos **Dev Containers**.

Por que essa abordagem? O uso de um ambiente isolado oferece vantagens significativas, garantindo **consistência, portabilidade e gerenciamento simplificado** de dependências.

-----

## 🛠️ Benefícios do Ambiente Isolado com Dev Containers

### 1\. Sistema Operacional Consistente (Linux x86\_64)

Rodar o projeto dentro de um container baseado em **Linux com arquitetura x86\_64** elimina problemas de compatibilidade relacionados ao sistema operacional do host (Windows, macOS, outro Linux).

  * Muitos comandos, binários e até mesmo bibliotecas de baixo nível geram ou executam código específico para o SO.
  * Dentro do Dev Container, o ambiente é sempre Linux, **replicando fielmente o ambiente de deploy de produção**.
  * Isso garante que o código que funciona na sua máquina seja **exatamente** o código que funcionará no ambiente de produção, reduzindo o temido "na minha máquina funciona\!".

### 2\. Gerenciamento Simplificado de Dependências

Todas as dependências necessárias para o desenvolvimento são **pré-instaladas** no momento em que você inicia o container, garantindo que todos usem as **versões exatas** definidas pelo projeto.

#### A. Dependências de Sistema e Bibliotecas

  * **Definição:** Programas de sistema (ex: **`ffmpeg`**) ou bibliotecas de SO são definidas no Dockerfile específico de desenvolvimento (`docker/dev/Dockerfile`).
  * **Vantagem:** Elas são instaladas durante a *build* do container. Graças ao **cache do Docker**, você não precisa baixá-las ou instalá-las novamente a cada inicialização, a menos que o Dockerfile seja alterado.

#### B. Processos Dependentes (Bancos de Dados, etc.)

  * **Definição:** Outros serviços necessários (ex: banco de dados, *message queues*) são definidos em um arquivo **`docker-compose`** separado (`docker/services/docker-compose.yml`) que é importado em todos os ambientes.

#### C. Versões Exatas

Ao fixar todas as versões de *runtime* e dependências dentro do container, você elimina o problema de desenvolvedores com versões diferentes do Node.js, Python, Ruby, ou qualquer outra ferramenta, garantindo que o ambiente seja **idêntico para toda a equipe**.

### 3\. Gerenciamento de Portas e Isolamento de Rede

Os Dev Containers utilizam o **sistema de rede interno do Docker**, o que soluciona o problema de conflito de portas no computador do desenvolvedor.

  * As portas dos serviços internos (como o banco de dados) **não ficam expostas** no host, evitando conflitos com outros projetos ou serviços que você possa estar rodando.
  * Ao encerrar o ambiente de desenvolvimento, o Docker para todos os containers, liberando os recursos e o espaço de portas para que você possa iniciar outro projeto ou ambiente sem problemas.

-----

## ▶️ Como Iniciar o Projeto

A maneira mais eficiente de trabalhar com este ambiente é utilizando as ferramentas integradas para Dev Containers.

### Opção 1: Extensão VS Code (Recomendada)

A forma mais fácil de começar é instalando a extensão oficial \*\*\*\*\*\* **Dev Containers** da Microsoft no **VS Code**.

1.  **Instale a Extensão:** Procure por "Dev Containers" no *marketplace* do VS Code e instale.
2.  **Abrir o Projeto:** Ao abrir a pasta do projeto no VS Code, uma notificação irá aparecer solicitando que você **"Reopen in Container"** (Reabrir no Container).
3.  **Primeira Inicialização:** Na primeira vez, o VS Code fará a **`build`** do ambiente e o iniciará. Em seguida, ele reabrirá o editor **dentro** do container, pronto para codificar.

### Opção 2: Outros Métodos de Início

Se não estiver usando VS Code ou preferir o CLI:

  * **CLI do Dev Containers:** Utilize a **`dev-container cli`** para inicializar o ambiente via linha de comando.
  * **Docker Compose + VS Code:** Inicie o Docker Compose de desenvolvimento (`docker-compose up -d`) e use a extensão **"Docker" / "Containers"** do seu IDE para **anexar** (attach) o VS Code ao container em execução.

-----

## ⚙️ Modificações no Ambiente e Arquivos de Override

Caso você precise modificar as configurações do ambiente de desenvolvimento (ex: expor portas, mudar variáveis de ambiente, testar configurações locais), siga estas diretrizes:

### Para Configurações de Dev Container e Imagem

  * **Configurações do VS Code/Container:** Altere as configurações do Dev Container no arquivo **`.devcontainer/devcontainer.json`**.
  * **Instalação de Binários/Bibliotecas:** Para adicionar programas de sistema ou mudar a imagem base, modifique o **Dockerfile de desenvolvimento** (`docker/dev/Dockerfile`).

### Para Configurações de Execução Local (Overrides)

Para evitar que alterações locais acidentais afetem a configuração de toda a equipe ou o versionamento, use o recurso **`override`** do Docker Compose para modificações *temporárias ou de teste*:

  * **Criação do Override:** Crie um arquivo chamado **`docker-compose.override.yml`** (ou qualquer nome com a extensão `.override.yml`).
  * **Funcionalidade:** O arquivo `override` **sobrescreve ou adiciona** configurações ao arquivo `docker-compose.yml` principal.
  * **Regra de Ouro:** Arquivos `*.override.yml` são considerados de **execução local** e **não devem ser commitados** para o Git.

**Exemplo de Execução Manual com Override:**

```bash
docker compose -f docker-compose.yml -f docker-compose.override.yml up -d
```
