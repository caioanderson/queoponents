import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Text, type TextProps, type TextTag } from "@queoponents/react";
import { text as textTokens, colors } from "@queoponents/tokens";
import { getContrast } from "polished";

const sizeOptions = Object.keys(textTokens.sizes);
const tagOptions: TextTag[] = [
  "span",
  "p",
  "label",
  "small",
  "strong",
  "em",
  "b",
  "i",
  "u",
  "s",
  "mark",
  "code",
  "pre",
  "blockquote",
  "cite",
  "q",
  "abbr",
  "kbd",
  "sup",
  "sub",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
];

export default {
  title: "Components/Text",
  component: Text,
  tags: ["autodocs"],
  globals: {
    background: "dark",
  },
  args: {
    size: "paragraph",
    children: "The quick brown fox jumps over the lazy dog.",
    as: "p",
  },
  argTypes: {
    size: {
      options: sizeOptions,
      control: { type: "select" },
    },
    children: {
      control: { type: "text" },
    },
    as: {
      options: tagOptions,
      control: { type: "select" },
    },
  },
} as Meta<TextProps>;

export const Default: StoryObj<TextProps> = {
  render: ({ children, ...args }) => {
    const backgroundColor = colors.surface.accent
    const contrastColor = getContrast(backgroundColor, '#fff') < 3.5 ? '#000' :
      '#fff'

    return (
      <Box width={400} p={10} br={8} style={{ backgroundColor }}>
        <Text {...args} style={{ color: contrastColor }}>
          {children}
        </Text>
      </Box>
    );
  }
};
