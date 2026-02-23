# Basic Style Dictionary

This example code is bare-bones to show you what this framework can do. If you have the style-dictionary module installed globally, you can `cd` into this directory and run:

```bash
npx style-dictionary build
```

Otherwise, install Style Dictionary locally for this project first, `cd` into this directory and run:

```bash
npm init -y && npm install style-dictionary
```

and then run the above command.

# Get Zeplin Token

Para obter o seu token de acesso pessoal do Zeplin, siga os passos abaixo:

1. Faça login na sua conta do [Zeplin](https://app.zeplin.io).
2. Clique na sua imagem de perfil no canto superior direito.
3. Selecione **Account Settings**.
4. Clique na aba **Developer**.
5. Na seção **Personal Access Tokens**, clique em **Create new token**.
6. Dê um nome ao token (ex: "Design Tokens Sync") e clique em **Create**.
7. Copie o token gerado imediatamente e salve-o no seu arquivo `.env` na raiz deste pacote como `ZEPLIN_TOKEN`.

> [!IMPORTANT]
> O token é exibido apenas uma vez. Certifique-se de copiá-lo antes de fechar a janela.
