import { textStyles } from "@queoponents/tokens";
import "../styles/typography-table.css";

type TextStyleValue = {
  fontFamily?: string;
  fontSize?: string | number;
  fontWeight?: string | number;
  lineHeight?: string | number;
  letterSpacing?: string | number;
};

type TextStyleEntry = [string, TextStyleValue];

const weightLabelMap: Record<string, string> = {
  "300": "Light",
  "400": "Regular",
  "500": "Medium",
  "600": "Semi bold",
  "700": "Bold",
};

function toTitleCase(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (char) => char.toUpperCase());
}

function styleLabel(key: string) {
  const label = toTitleCase(key);
  const parts = label.split(" ");
  const last = parts[parts.length - 1]?.toLowerCase();
  if (last === "regular" || last === "emphasis") {
    const variant = parts.pop();
    return `${parts.join(" ")}/${variant}`;
  }
  return label;
}

function toDisplayUnit(value?: string | number) {
  if (value === undefined || value === null || value === "") return "—";
  const raw = String(value);
  return raw;
}

function toVariant(value?: string | number) {
  if (value === undefined || value === null || value === "") return "—";
  const key = String(value);
  return weightLabelMap[key] ?? key;
}

function toNumber(value?: string | number) {
  if (value === undefined || value === null) return 0;
  const num = Number(String(value).replace(/px/, ""));
  return Number.isNaN(num) ? 0 : num;
}

export function TypographyTable() {
  const entries = Object.entries(textStyles) as TextStyleEntry[];
  const rows = entries
    .map(([key, value]) => ({
      key,
      value,
      sizeValue: toNumber(value.fontSize),
    }))
    .sort((a, b) => b.sizeValue - a.sizeValue || a.key.localeCompare(b.key));

  return (
    <table className="typography-table">
      <thead>
        <tr>
          <th>Style</th>
          <th>Font</th>
          <th>Variant</th>
          <th>Size</th>
          <th>Letter spacing</th>
          <th>Line height</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(({ key, value }) => (
          <tr key={key}>
            <td
              className="typography-table-style"
              style={{
                fontFamily: value.fontFamily,
                fontWeight: value.fontWeight,
                fontSize: value.fontSize,
                lineHeight: value.lineHeight,
                letterSpacing: value.letterSpacing,
              }}
              title={styleLabel(key)}
            >
              {styleLabel(key)}
            </td>
            <td title={value.fontFamily ?? "—"}>{value.fontFamily ?? "—"}</td>
            <td title={toVariant(value.fontWeight)}>{toVariant(value.fontWeight)}</td>
            <td title={toDisplayUnit(value.fontSize)}>{toDisplayUnit(value.fontSize)}</td>
            <td title={toDisplayUnit(value.letterSpacing)}>{toDisplayUnit(value.letterSpacing)}</td>
            <td title={toDisplayUnit(value.lineHeight)}>{toDisplayUnit(value.lineHeight)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
