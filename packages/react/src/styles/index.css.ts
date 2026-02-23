import { createTheme } from "@vanilla-extract/css";
import {
  colors,
  motion,
  radii,
  shadows,
  spacing,
  textStyles,
} from "@queoponents/tokens";

const [themeClass, vars] = createTheme({
  colors,
  motion,
  radii,
  shadows,
  spacing,
  textStyles,
});

export { themeClass, vars as theme };
