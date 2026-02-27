# Queoponents Design System

Bem-vindo ao **Queoponents**, um Design System moderno e escalável construído com as melhores práticas de desenvolvimento web. Este é um monorepo gerenciado pelo [Turborepo](https://turbo.build/), que centraliza tokens de design, componentes React reutilizáveis e documentação completa.

## 🚀 Estrutura do Monorepo

O projeto está organizado em pacotes dentro do diretório `/packages`:

- **[@queoponents/tokens](file:///Volumes/HyperDisk/www/queoponents/packages/tokens)**: Contém as definições de cores, espaçamentos, tipografia e outros tokens de design. Integrado com Style Dictionary.
- **[@queoponents/react](file:///Volumes/HyperDisk/www/queoponents/packages/react)**: Biblioteca de componentes React estilizados com [Vanilla Extract](https://vanilla-extract.style/).
- **[@queoponents/docs](file:///Volumes/HyperDisk/www/queoponents/packages/docs)**: Documentação interativa e ambiente de testes dos componentes utilizando o [Storybook](https://storybook.js.org/).
- **[@queoponents/ts-config](file:///Volumes/HyperDisk/www/queoponents/packages/ts-config)**: Configurações compartilhadas de TypeScript para manter a consistência entre os pacotes.

## 🛠️ Tecnologias Principais

- **Framework**: React 19
- **Linguagem**: TypeScript 5
- **Estilização**: Vanilla Extract (CSS-in-JS com zero runtime)
- **Documentação**: Storybook 9
- **Build Tool**: Tsup / Vite
- **Monorepo Manager**: Turborepo

## ⚙️ Pré-requisitos

Este projeto utiliza o [Volta](https://volta.sh/) para gerenciar e fixar as versões das ferramentas, garantindo que todos os desenvolvedores utilizem o mesmo ambiente.

**Facilita a configuração do projeto se o Volta estiver instalado na sua máquina.** Você pode instalá-lo seguindo as instruções em [volta.sh](https://volta.sh/).

- **Node.js**: `v22.5.1` (Gerenciado automaticamente pelo Volta)
- **npm**: `10.8.2` (Gerenciado automaticamente pelo Volta)

## 🏁 Começando

1.  **Instalação**: Instale todas as dependências do monorepo:

    ```bash
    npm install
    ```

2.  **Desenvolvimento**: Inicie o ambiente de desenvolvimento (Storybook):

    ```bash
    npm run dev
    ```

3.  **Build**: Gere o build de produção de todos os pacotes:

    ```bash
    npm run build
    ```

---

Desenvolvido com ❤️ pela equipe do Queoponents.
