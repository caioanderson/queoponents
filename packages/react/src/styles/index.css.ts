import { createTheme } from "@vanilla-extract/css";
import { color } from "@queoponents/tokens";

export const [themeClass, vars] = createTheme({
  color,
});
