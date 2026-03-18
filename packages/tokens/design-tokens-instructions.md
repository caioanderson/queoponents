# 📐 Design Tokens --- Contexto e Instruções para Formatação por IA

Este documento define **o padrão oficial de organização, nomenclatura e
estruturação dos Design Tokens** do projeto.

Ele deve ser usado como **referência de contexto**,
scripts de automação ou ferramentas que convertam/exportem tokens.

O objetivo é garantir que qualquer dado bruto recebido seja
**normalizado, consistente e escalável** dentro do Design System.

---

# 🎯 Objetivo

Transformar dados de design em **tokens
estruturados**, seguindo:

- organização semântica
- nomenclatura previsível
- separação por domínio visual
- suporte futuro a temas (light/dark/brand)

Deve-se **reorganizar e renomear**, nunca apenas copiar os dados
originais.

---

# 🧱 Estrutura Oficial de Tokens

Todos os tokens devem ser divididos por categoria:

    tokens/
      src/
        ├── colors.css.ts
        ├── typography.css.ts
        ├── spacing.css.ts
        ├── radii.css.ts
        ├── shadows.css.ts
        ├── motion.css.ts
        └── index.ts

Cada arquivo representa um **domínio visual**

---

# 🎨 COLORS

## ✅ Regra Geral

Tokens de cor devem ser **semânticos**, nunca descritivos do arquivo de
origem.

### Estrutura obrigatória

- `colors.text` deve remover o prefixo `text` das chaves (ex: `textPrimary` → `primary`).
- `colors.palette` é a System Palette e deve agrupar por família de cor (`blue`, `blueGray`, `deepPurple`, etc.) com níveis `lighter`, `light`, `base`, `dark`, `darker`.
- `colors.tailwind` deve agrupar por família de cor (`blue`, `gray`, `amber`, etc.) com níveis numéricos (`50`, `100`, `200`, ...).
- `colors.theme` deve ser dividido em `info`, `state` e `text`.

### ❌ NÃO PERMITIDO

    colors-border-colors-success-light-mode
    green-200
    figma-color-12

### ✅ PERMITIDO

    borderColors.success
    textColors.primary
    backgroundColors.surface

---

## Exemplo de saída esperada

```ts
export const colors = {
  borders: {
    success: "rgb(110, 231, 183)",
    warning: "rgb(253, 224, 71)",
    danger: "rgb(252, 165, 165)",
  },
  surface: {
    level0: "rgb(10, 10, 10)",
    level1: "rgb(38, 38, 38)",
  },
  text: {
    accent: "rgb(147, 197, 253)",
    primary: "rgb(250, 250, 250)",
    secondary: "rgb(212, 212, 212)",
    disabled: "rgb(212, 212, 212)",
    negative: "rgb(23, 23, 23)",
  },
  palette: {
    blue: {
      lighter: "rgb(239, 246, 255)",
      light: "rgb(147, 197, 253)",
      base: "rgb(11, 117, 255)",
      dark: "rgb(0, 84, 197)",
      darker: "rgb(30, 58, 138)",
    },
    blueGray: {
      lighter: "rgb(248, 250, 252)",
      light: "rgb(203, 213, 225)",
      base: "rgb(100, 116, 139)",
      dark: "rgb(51, 65, 85)",
      darker: "rgb(15, 23, 42)",
    },
  },
  tailwind: {
    blue: {
      50: "rgb(239, 246, 255)",
      100: "rgb(219, 234, 254)",
      200: "rgb(191, 219, 254)",
    },
  },
  theme: {
    info: {
      danger: "rgb(239, 68, 68)",
      warning: "rgb(253, 224, 71)",
      success: "rgb(134, 239, 172)",
    },
    state: {
      active: "rgb(11, 117, 255)",
      hover: "rgb(147, 197, 253)",
      disabled: "rgb(115, 115, 115)",
    },
    text: {},
  },
};
```

---

## Temas (se ou quando existirem)

Se houver variações de tema:

```ts
export const borderColors = {
  light: {
    success: "...",
  },
  dark: {
    success: "...",
  },
};
```

---

# 🔤 TYPOGRAPHY

## ✅ Regra Geral

Text styles devem virar objetos reutilizáveis diretamente no código.

A IA deve:

- converter nomes kebab-case → camelCase
- remover prefixos técnicos (`system-`, `text-style-`, etc.)
- manter significado visual

---

## Exemplo de entrada

    system-small-regular
    system-medium-bold

---

## Exemplo de saída

```ts
export const textStyles = {
  smallRegular: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 16,
  },

  mediumBold: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 20,
  },
};
```

---

## Conversões obrigatórias

| Entrada       |   Saída    |
| :------------ | :--------: |
| kebab-case    | camelCase  |
| weight number |   string   |
| line_height   | lineHeight |
| font.family   | fontFamily |

---

# 📏 SPACING

Mesmo que vazio, o arquivo deve existir.

---

## Exemplo

```ts
export const space = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
};
```

---

# 🧠 REGRAS DE NORMALIZAÇÃO (OBRIGATÓRIAS)

Deve aplicar automaticamente:

## 1️⃣ Nomeação

- usar **camelCase**
- remover redundâncias
- remover contexto de ferramenta (figma, export, system, global, zeplin, taiwind)

---

## 2️⃣ Semântica acima da aparência

Tokens devem representar **intenção**, não cor ou tamanho.

### ❌ Errado

    greenLight
    yellowBorder

### ✅ Correto

    success
    warning
    danger

---

## 3️⃣ Agrupamento lógico

Tokens devem ser agrupados por uso:

Uso Arquivo

---

bordas colors/border.ts
texto colors/text.ts
fundo colors/background.ts

---

## 4️⃣ Flatten inteligente

Deve remover níveis desnecessários:

### Entrada

    colors.border.colors.success.light.mode

### Saída

    borderColors.success

---

## 5️⃣ Compatibilidade com React Native

Todos os tokens devem ser diretamente utilizáveis, exemplo de uso em uma aplicação real:

```ts
<Text style={textStyles.mediumBold} />

<View style={{ padding: space[4] }} />
```

---

# 🚫 O QUE NÃO DEVE FAZER

- ❌ manter nomes originais do Figma/Zeplin
- ❌ criar nesting profundo sem necessidade
- ❌ misturar categorias (ex: typography dentro de colors)
- ❌ duplicar valores
- ❌ criar tokens não semânticos

---

# ✅ EXPORT CENTRAL

Sempre gerar:

    tokens/src/index.ts

```ts
export * from "./colors";
export * from "./typography";
export * from "./spacing";
```

---

# 🧩 CAMADAS DE TOKENS (CONCEITO)

O sistema segue 3 níveis:

    1. Primitive Tokens   → valores brutos (rgb, px)
    2. Semantic Tokens    → success, primary, surface
    3. Component Tokens   → button.primary.background

A IA deve priorizar **Semantic Tokens**.

---

# 🔮 EXTENSIBILIDADE FUTURA

O formato deve permitir adicionar:

- dark mode
- multi-brand themes
- white-label apps
- web + mobile compartilhando tokens

Sem necessidade de refatoração.

---

# ✅ RESULTADO ESPERADO

Após processamento pela IA:

- tokens organizados por domínio
- nomes consistentes
- código pronto para uso
- fácil manutenção
- escalável para temas futuros

---
