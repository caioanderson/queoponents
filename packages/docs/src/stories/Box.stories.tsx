import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, type BoxProps } from "@queoponents/react";
import { DecorativeDiv } from "../components/DecorativeDiv";

export default {
  title: "Surfaces/Box",
  component: Box,
  globals: {
    background: "dark",
  },
  tags: ["autodocs"],
  args: {
    width: 160,
    height: 160,
  },
  argTypes: {
    width: {
      description: "Largura do container (px ou string CSS).",
      table: { type: { summary: "string | number" } },
      control: { type: "text", },

    },
    height: {
      description: "Altura do container (px ou string CSS).",
      table: { type: { summary: "string | number" } },
      control: { type: "text" },
    },
    minWidth: {
      description: "Largura mínima.",
      table: { type: { summary: "string | number" } },
      control: { type: "text" },

    },
    maxWidth: {
      description: "Largura máxima.",
      table: { type: { summary: "string | number" } },
      control: { type: "text" },
    },
    minHeight: {
      description: "Altura mínima.",
      table: { type: { summary: "string | number" } },
      control: { type: "text" },
    },
    maxHeight: {
      description: "Altura máxima.",
      table: { type: { summary: "string | number" } },
      control: { type: "text" },
    },
    p: {
      description: "Padding em todos os lados.",
      table: { type: { summary: "number | string" } },
      control: { type: "number" },
    },
    px: {
      description: "Padding horizontal (left/right).",
      table: { type: { summary: "number | string" } },
      control: { type: "number" },
    },
    py: {
      description: "Padding vertical (top/bottom).",
      table: { type: { summary: "number | string" } },
      control: { type: "number" },
    },
    pt: {
      description: "Padding top.",
      table: { type: { summary: "number | string" } },
      control: { type: "number" },
    },
    pr: {
      description: "Padding right.",
      table: { type: { summary: "number | string" } },
      control: { type: "number" },
    },
    pb: {
      description: "Padding bottom.",
      table: { type: { summary: "number | string" } },
      control: { type: "number" },
    },
    pl: {
      description: "Padding left.",
      table: { type: { summary: "number | string" } },
      control: { type: "number" },
    },
    m: {
      description: "Margin em todos os lados.",
      table: { type: { summary: "number | string" } },
      control: { type: "number" },
    },
    mx: {
      description: "Margin horizontal (left/right).",
      table: { type: { summary: "number | string" } },
      control: { type: "number" },
    },
    my: {
      description: "Margin vertical (top/bottom).",
      table: { type: { summary: "number | string" } },
      control: { type: "number" },
    },
    mt: {
      description: "Margin top.",
      table: { type: { summary: "number | string" } },
      control: { type: "number" },
    },
    mr: {
      description: "Margin right.",
      table: { type: { summary: "number | string" } },
      control: { type: "number" },
    },
    mb: {
      description: "Margin bottom.",
      table: { type: { summary: "number | string" } },
      control: { type: "number" },
    },
    ml: {
      description: "Margin left.",
      table: { type: { summary: "number | string" } },
      control: { type: "number" },
    },
    display: {
      description: "Tipo de display CSS.",
      table: { type: { summary: "CSSProperties['display']" } },
      options: ["block", "inline-block", "flex", "inline-flex", "grid"],
      control: { type: "select" },
    },
    position: {
      description: "Posicionamento CSS.",
      table: { type: { summary: "CSSProperties['position']" } },
      options: ["static", "relative", "absolute", "fixed", "sticky"],
      control: { type: "select" },
    },
    overflow: {
      description: "Overflow CSS (x e y).",
      table: { type: { summary: "CSSProperties['overflow']" } },
      options: ["visible", "hidden", "auto", "scroll"],
      control: { type: "select" },
    },
    overflowX: {
      description: "Overflow no eixo X.",
      table: { type: { summary: "CSSProperties['overflowX']" } },
      options: ["visible", "hidden", "auto", "scroll"],
      control: { type: "select" },
    },
    overflowY: {
      description: "Overflow no eixo Y.",
      table: { type: { summary: "CSSProperties['overflowY']" } },
      options: ["visible", "hidden", "auto", "scroll"],
      // control: { type: "select" },
    },
    inset: {
      description: "Inset CSS shorthand.",
      table: { type: { summary: "number | string" } },
      control: { type: "text" },
    },
    top: {
      description: "Top CSS.",
      table: { type: { summary: "number | string" } },
      control: { type: "text" },
    },
    right: {
      description: "Right CSS.",
      table: { type: { summary: "number | string" } },
      control: { type: "text" },
    },
    bottom: {
      description: "Bottom CSS.",
      table: { type: { summary: "number | string" } },
      control: { type: "text" },
    },
    left: {
      description: "Left CSS.",
      table: { type: { summary: "number | string" } },
      control: { type: "text" },
    },
    flexBasis: {
      description: "Flex basis.",
      table: { type: { summary: "CSSProperties['flexBasis']" } },
      control: { type: "text" },
    },
    flexGrow: {
      description: "Flex grow.",
      table: { type: { summary: "CSSProperties['flexGrow']" } },
      control: { type: "number" },
    },
    flexShrink: {
      description: "Flex shrink.",
      table: { type: { summary: "CSSProperties['flexShrink']" } },
      control: { type: "number" },
    },
    gridArea: {
      description: "Grid area.",
      table: { type: { summary: "CSSProperties['gridArea']" } },
      control: { type: "text" },
    },
    gridColumn: {
      description: "Grid column.",
      table: { type: { summary: "CSSProperties['gridColumn']" } },
      control: { type: "text" },
    },
    gridColumnStart: {
      description: "Grid column start.",
      table: { type: { summary: "CSSProperties['gridColumnStart']" } },
      control: { type: "text" },
    },
    gridColumnEnd: {
      description: "Grid column end.",
      table: { type: { summary: "CSSProperties['gridColumnEnd']" } },
      control: { type: "text" },
    },
    gridRow: {
      description: "Grid row.",
      table: { type: { summary: "CSSProperties['gridRow']" } },
      control: { type: "text" },
    },
    gridRowStart: {
      description: "Grid row start.",
      table: { type: { summary: "CSSProperties['gridRowStart']" } },
      control: { type: "text" },
    },
    gridRowEnd: {
      description: "Grid row end.",
      table: { type: { summary: "CSSProperties['gridRowEnd']" } },
      control: { type: "text" },
    },
    b: {
      description: "Shorthand de border.",
      table: { type: { summary: "CSSProperties['border']" } },
      control: { type: "text" },
    },
    bw: {
      description: "Border width.",
      table: { type: { summary: "CSSProperties['borderWidth']" } },
      control: { type: "text" },
    },
    bs: {
      description: "Border style.",
      table: { type: { summary: "CSSProperties['borderStyle']" } },
      control: { type: "text" },
    },
    bc: {
      description: "Border color.",
      table: { type: { summary: "CSSProperties['borderColor']" } },
      control: { type: "text" },
    },
    br: {
      description: "Border radius.",
      table: { type: { summary: "CSSProperties['borderRadius']" } },
      control: { type: "text" },
    },
  },
} as Meta<BoxProps>;

export const Default: StoryObj<BoxProps> = {
  render: ({ children, ...args }) => {
    return (
      <Box {...args}>
        {children ?? <DecorativeDiv />}
      </Box>
    );
  }
};
