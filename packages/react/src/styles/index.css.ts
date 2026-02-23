import { createTheme } from "@vanilla-extract/css";
import {
  colors,
  motion,
  radii,
  shadows,
  spacing,
  textStyles,
} from "@queoponents/tokens";

export const [themeClass, vars] = createTheme({
  colors,
  motion,
  radii,
  shadows,
  spacing,
  textStyles,
});
