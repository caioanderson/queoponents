import StyleDictionary from "style-dictionary";
import fs from "fs";

// Auxiliar para camelCase
const toCamelCase = (str) =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase(),
    )
    .replace(/\s+/g, "")
    .replace(/-+/g, "")
    .replace(/_+/g, "");

// Limpeza de redundâncias conforme manual
const cleanTokenName = (name) => {
  if (!name) return "";
  return name
    .replace(
      /^(colors|textStyles|text_styles|typography|spacing|system|zeplin|figma|tailwind)-/i,
      "",
    )
    .replace(/-(colors|palette|style|mode)-/i, "-")
    .replace(/-(light|dark)$/i, "")
    .replace(/-(light|dark)-mode$/i, "");
};

// Formato para CORES (export único com sub-objetos)
StyleDictionary.registerFormat({
  name: "typescript/colors",
  format: ({ dictionary }) => {
    const colors = {
      borders: {},
      surface: {},
      text: {},
      palette: {},
      theme: {},
    };

    dictionary.allTokens.forEach((token) => {
      const fullPathString = token.path.join("-").toLowerCase();
      let groupKey = null;

      if (fullPathString.includes("border")) groupKey = "borders";
      else if (fullPathString.includes("surface")) groupKey = "surface";
      else if (fullPathString.includes("text")) groupKey = "text";
      else if (fullPathString.includes("palette")) groupKey = "palette";
      else if (fullPathString.includes("theme")) groupKey = "theme";

      if (groupKey) {
        const rawName = token.path[token.path.length - 1];
        const name = toCamelCase(
          cleanTokenName(rawName).replace(
            /^(border|surface|text|palette|theme|colors)-/i,
            "",
          ),
        );

        colors[groupKey][name] = token.value;
      }
    });

    // Remove grupos vazios para limpeza
    Object.keys(colors).forEach((key) => {
      if (Object.keys(colors[key]).length === 0) delete colors[key];
    });

    return `export const colors = ${JSON.stringify(colors, null, 2)};\n`;
  },
});

StyleDictionary.registerFormat({
  name: "typescript/typography",
  format: ({ dictionary }) => {
    const textStyles = {};

    dictionary.allTokens.forEach((token) => {
      // No Zeplin, o token de texto tem o valor completo no objeto 'value'
      if (token.path.length < 2) return;

      const styleNameRaw = token.path[1];
      const styleName = toCamelCase(cleanTokenName(styleNameRaw));

      const val = token.value;
      if (typeof val === "object" && val !== null) {
        textStyles[styleName] = {
          fontFamily: val.font?.family || "",
          fontSize: `${val.font?.size || 0}px`,
          fontWeight: String(val.font?.weight || 400),
          lineHeight: `${val.line_height || 0}px`,
        };

        // Adiciona letterSpacing se existir
        if (val.letter_spacing !== undefined) {
          textStyles[styleName].letterSpacing = `${val.letter_spacing}px`;
        }
      }
    });

    return `export const textStyles = ${JSON.stringify(textStyles, null, 2)};\n`;
  },
});

// Formato genérico para outros (spacing, radii, shadows, motion)
StyleDictionary.registerFormat({
  name: "typescript/vanilla-extract",
  format: ({ dictionary, file }) => {
    const constName = file.destination.split(".")[0];
    const tokenObject = {};

    dictionary.allTokens.forEach((token) => {
      const finalName = toCamelCase(cleanTokenName(token.name));
      let value = token.value;
      if (typeof value === "number") {
        value = `${value}px`;
      }
      tokenObject[finalName] = value;
    });

    return `export const ${constName} = ${JSON.stringify(tokenObject, null, 2)};\n`;
  },
});

const sd = new StyleDictionary({
  source: ["input-zeplin/tokens.json"],
  platforms: {
    ts: {
      transformGroup: "js",
      buildPath: "src/",
      files: [
        {
          destination: "colors.css.ts",
          format: "typescript/colors",
          filter: (token) => token.path[0] === "colors",
        },
        {
          destination: "typography.css.ts",
          format: "typescript/typography",
          filter: (token) => token.path[0] === "text_styles",
        },
        {
          destination: "spacing.css.ts",
          format: "typescript/vanilla-extract",
          filter: (token) => token.path[0] === "spacing",
        },
        {
          destination: "radii.css.ts",
          format: "typescript/vanilla-extract",
          filter: (token) => token.path[0] === "radii",
        },
        {
          destination: "shadows.css.ts",
          format: "typescript/vanilla-extract",
          filter: (token) => token.path[0] === "shadows",
        },
        {
          destination: "motion.css.ts",
          format: "typescript/vanilla-extract",
          filter: (token) => token.path[0] === "motion",
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();

// Garantir que os arquivos existam e atualizar index.ts conforme manual
const expectedFiles = [
  { path: "src/colors.css.ts", name: "colors" },
  { path: "src/typography.css.ts", name: "typography" },
  { path: "src/spacing.css.ts", name: "spacing" },
  { path: "src/radii.css.ts", name: "radii" },
  { path: "src/shadows.css.ts", name: "shadows" },
  { path: "src/motion.css.ts", name: "motion" },
];

let indexContent = "";

expectedFiles.forEach((file) => {
  if (!fs.existsSync(file.path)) {
    const constName = file.path.split("/").pop().split(".")[0];
    const fallback = constName === "typography" ? "textStyles" : constName;
    fs.writeFileSync(file.path, `export const ${fallback} = {};\n`);
    console.log(`✔︎ ${file.path} (vazio criado manualmente)`);
  }
  const baseName = file.path.split("/").pop().replace(".css.ts", ".css");
  indexContent += `export * from "./${baseName}";\n`;
});

fs.writeFileSync("src/index.ts", indexContent);
console.log("✔︎ src/index.ts atualizado.");
