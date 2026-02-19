import { dirname, join, resolve } from "path";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import type { StorybookConfig } from "@storybook/react-vite";

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
  stories: [
    "../src/pages/**/*.mdx",
    "../src/stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ["@storybook/addon-docs", "@storybook/addon-themes"],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  async viteFinal(config) {
    config.resolve = {
      ...(config.resolve || {}),
      alias: {
        ...(config.resolve?.alias || {}),
        "@queoponents/react": resolve(__dirname, "../../react/src"),
      },
    };

    config.plugins = [...(config.plugins || []), vanillaExtractPlugin()];
    return config;
  },
};

export default config;
