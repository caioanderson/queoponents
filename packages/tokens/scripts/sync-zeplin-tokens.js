import "dotenv/config";
import fs from "fs";

fs.mkdirSync("./input-zeplin", { recursive: true });

const response = await fetch(
  "https://api.zeplin.dev/v1/projects/689a4ad9c7fb2b7212bd6aef/design_tokens",
  {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.ZEPLIN_TOKEN}`,
    },
  },
);

if (!response.ok) {
  console.error("Erro ao buscar tokens do Zeplin:", response.statusText);
  process.exit(1);
}

const data = await response.json();

function detectChanges(oldObj = {}, newObj = {}, prefix = "") {
  const changes = [];
  const allKeys = new Set([...Object.keys(oldObj), ...Object.keys(newObj)]);

  for (const k of allKeys) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    const oldVal = JSON.stringify(oldObj[k]);
    const newVal = JSON.stringify(newObj[k]);

    if (!(k in oldObj)) {
      changes.push({ key: fullKey, type: "added", value: newObj[k] });
    } else if (!(k in newObj)) {
      changes.push({ key: fullKey, type: "removed", old_value: oldObj[k] });
    } else if (oldVal !== newVal) {
      changes.push({
        key: fullKey,
        type: "changed",
        old_value: oldObj[k],
        new_value: newObj[k],
      });
    }
  }

  return changes;
}

function toYaml(changes, category) {
  if (changes.length === 0) return "";
  let yaml = `  ${category}:\n`;
  for (const c of changes) {
    yaml += `    - key: "${c.key}"\n`;
    yaml += `      type: ${c.type}\n`;
    if (c.old_value !== undefined)
      yaml += `      old_value: ${JSON.stringify(c.old_value)}\n`;
    if (c.new_value !== undefined)
      yaml += `      new_value: ${JSON.stringify(c.new_value)}\n`;
    if (c.value !== undefined)
      yaml += `      value: ${JSON.stringify(c.value)}\n`;
  }
  return yaml;
}

const inputPath = "./input-zeplin/tokens.json";
let hasAnyChange = false;
let changelogBody = `date: "${new Date().toISOString()}"\nchanges:\n`;

if (fs.existsSync(inputPath)) {
  const currentContent = fs.readFileSync(inputPath, "utf-8");
  const currentData = JSON.parse(currentContent);

  if (JSON.stringify(currentData) !== JSON.stringify(data)) {
    hasAnyChange = true;
    for (const key of Object.keys(data)) {
      const diffs = detectChanges(currentData[key], data[key]);
      if (diffs.length > 0) {
        changelogBody += toYaml(diffs, key);
      }
    }
    fs.writeFileSync(inputPath, JSON.stringify(data, null, 2));
    console.log("- input/tokens.json atualizado.");
  } else {
    console.log("- Nenhuma mudança detectada nos tokens.");
  }
} else {
  hasAnyChange = true;
  fs.writeFileSync(inputPath, JSON.stringify(data, null, 2));
  changelogBody += "  all:\n    - type: created\n";
  console.log("- input/tokens.json criado.");
}

if (hasAnyChange) {
  fs.mkdirSync("./changelog", { recursive: true });
  fs.writeFileSync(`./changelog/tokens-changelog.yml`, changelogBody);
  console.log("- Changelog gerado em changelog/tokens-changelog.yml");
}
