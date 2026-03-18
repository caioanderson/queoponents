import { createTheme } from "@vanilla-extract/css";
import {
  colors,
  motion,
  radii,
  shadows,
  spacing,
  text,
} from "@queoponents/tokens";

const themeText = {
  ...text,
  weights: Object.fromEntries(
    Object.entries(text.weights).map(([key, value]) => [key, String(value)]),
  ),
};

const [themeClass, theme] = createTheme({
  colors,
  motion,
  radii,
  shadows,
  spacing,
  text: themeText,
});

export { themeClass, theme };
