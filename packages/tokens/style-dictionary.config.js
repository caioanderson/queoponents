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
      tailwind: {},
      theme: {},
    };

    dictionary.allTokens.forEach((token) => {
      const rawName = token.path?.[1] ?? token.name;
      const cleaned = cleanTokenName(rawName);
      const parts = cleaned.split("-").filter(Boolean);
      const group = parts[0]?.toLowerCase();

      if (!group) return;

      if (group === "border") {
        const name = toCamelCase(parts.slice(1).join("-"));
        colors.borders[name] = token.value;
        return;
      }

      if (group === "surface") {
        const name = toCamelCase(parts.slice(1).join("-"));
        colors.surface[name] = token.value;
        return;
      }

      if (group === "text") {
        const normalizedParts =
          parts[1]?.toLowerCase() === "text" ? parts.slice(2) : parts.slice(1);
        const name = toCamelCase(normalizedParts.join("-"));
        colors.text[name] = token.value;
        return;
      }

      if (group === "system") {
        const shadeRaw = parts[parts.length - 1] || "";
        const shade = shadeRaw.toLowerCase() === "ligther" ? "lighter" : shadeRaw;
        const colorName = toCamelCase(parts.slice(1, -1).join("-"));
        if (!colors.palette[colorName]) colors.palette[colorName] = {};
        colors.palette[colorName][shade.toLowerCase()] = token.value;
        return;
      }

      if (group === "tailwind") {
        const shade = parts[parts.length - 1];
        const colorName = toCamelCase(parts.slice(1, -1).join("-"));
        if (!colors.tailwind[colorName]) colors.tailwind[colorName] = {};
        colors.tailwind[colorName][shade] = token.value;
        return;
      }

      if (group === "theme") {
        const themeGroup = parts[1]?.toLowerCase();
        const name = toCamelCase(parts.slice(2).join("-"));
        if (!colors.theme[themeGroup]) colors.theme[themeGroup] = {};
        colors.theme[themeGroup][name] = token.value;
        if (themeGroup === "text") {
          colors.text[name] = token.value;
        }
      }
    });

    // Remove grupos vazios para limpeza
    Object.keys(colors).forEach((key) => {
      if (Object.keys(colors[key]).length === 0) delete colors[key];
    });

    const outputPath = "src/colors.css.ts";
    const output = `export const colors = ${JSON.stringify(colors, null, 2)};\n`;
    const hasColors = Object.keys(colors).length > 0;

    if (!hasColors) {
      if (fs.existsSync(outputPath)) {
        console.warn(
          "⚠️  Colors vazio. Mantendo o arquivo anterior sem sobrescrever.",
        );
        return fs.readFileSync(outputPath, "utf8");
      }
      console.warn("⚠️  Colors vazio e sem arquivo anterior para manter.");
      return output;
    }

    console.log("✅ Colors gerado e sobrescrito em src/colors.css.ts");
    return output;
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

StyleDictionary.registerFormat({
  name: "typescript/text",
  format: ({ dictionary }) => {
    const families = new Set();
    const weights = new Set();
    const lineHeights = new Set();
    const sizes = {};

    const sizeNameMapByStyle = {
      tiny: "tiny",
      small: "small",
      label: "label",
      "table-header": "label",
      paragraph: "paragraph",
      headline: "headline",
      subtitle: "subtitle",
      "page-header": "header",
      "fieldset-header": "header",
      "medium-value": "medium",
      "large-value": "large",
      header: "header",
      medium: "medium",
      large: "large",
    };

    dictionary.allTokens.forEach((token) => {
      const val = token.value;
      if (typeof val !== "object" || val === null) return;
      if (val.font?.family) families.add(val.font.family);
      if (val.font?.weight) weights.add(val.font.weight);
      if (val.line_height) lineHeights.add(val.line_height);
      if (val.font?.size) {
        const rawName = token.path?.[1] ?? token.name;
        const cleaned = cleanTokenName(rawName);
        const parts = cleaned.split("-").filter(Boolean);
        const last = parts[parts.length - 1];
        const baseParts =
          last === "regular" || last === "emphasis" ? parts.slice(0, -1) : parts;
        const baseName = baseParts.join("-");
        const sizeKey = sizeNameMapByStyle[baseName];

        if (sizeKey) {
          const value = `${val.font.size}px`;
          if (sizes[sizeKey] && sizes[sizeKey] !== value) {
            console.warn(
              `⚠️  Size duplicado com valor diferente para ${sizeKey}: ${sizes[sizeKey]} vs ${value}`,
            );
          } else {
            sizes[sizeKey] = value;
          }
        }
      }
    });

    const text = {
      fonts: {},
      weights: {},
      lineHeight: {},
      sizes: {},
    };

    Array.from(families).forEach((family) => {
      const key = toCamelCase(String(family));
      text.fonts[key] = `${family}, sans-serif`;
    });

    const weightNameMap = {
      300: "light",
      400: "regular",
      500: "medium",
      600: "semiBold",
      700: "bold",
    };

    Array.from(weights)
      .map(Number)
      .sort((a, b) => a - b)
      .forEach((weight) => {
        const name = weightNameMap[weight] ?? `w${weight}`;
        text.weights[name] = weight;
      });

    const lineHeightNameMap = {
      14: "small",
      16: "normal",
      18: "medium",
      24: "large",
      32: "xLarge",
      36: "xxLarge",
      64: "xxxLarge",
    };

    Array.from(lineHeights)
      .map(Number)
      .sort((a, b) => a - b)
      .forEach((value) => {
        const name = lineHeightNameMap[value] ?? `lh${value}`;
        text.lineHeight[name] = `${value}px`;
      });

    const sizeOrder = [
      "tiny",
      "small",
      "label",
      "paragraph",
      "headline",
      "subtitle",
      "header",
      "medium",
      "large",
    ];

    sizeOrder.forEach((key) => {
      if (sizes[key]) {
        text.sizes[key] = sizes[key];
      }
    });

    const isValidIdentifier = (key) => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key);
    const formatObject = (value, indent = 2) => {
      if (value === null) return "null";
      if (Array.isArray(value)) {
        return `[${value.map((item) => formatObject(item, indent)).join(", ")}]`;
      }
      if (typeof value === "object") {
        const pad = " ".repeat(indent);
        const innerPad = " ".repeat(indent + 2);
        const entries = Object.entries(value)
          .map(([key, val]) => {
            const safeKey = isValidIdentifier(key) ? key : `"${key}"`;
            return `${innerPad}${safeKey}: ${formatObject(val, indent + 2)}`;
          })
          .join(",\n");
        return `{\n${entries}\n${pad}}`;
      }
      if (typeof value === "string") return `"${value}"`;
      return String(value);
    };

    return `export const text = ${formatObject(text, 0)};\n`;
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
          destination: "text.css.ts",
          format: "typescript/text",
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
  { path: "src/text.css.ts", name: "text" },
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
    const fallback =
      constName === "typography" ? "textStyles" : constName;
    fs.writeFileSync(file.path, `export const ${fallback} = {};\n`);
    console.log(`✔︎ ${file.path} (vazio criado manualmente)`);
  }
  const baseName = file.path.split("/").pop().replace(".css.ts", ".css");
  indexContent += `export * from "./${baseName}";\n`;
});

fs.writeFileSync("src/index.ts", indexContent);
console.log("✔︎ src/index.ts atualizado.");
