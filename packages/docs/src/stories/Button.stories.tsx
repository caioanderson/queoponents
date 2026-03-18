import type { StoryObj, Meta } from "@storybook/react-vite";
import { Button, faClassNames, Text, type ButtonRootProps, type FaClassName } from "@queoponents/react";
import { colors } from "@queoponents/tokens";

export default {
  title: "Components/Button",
  component: Button.Root,
  tags: ["autodocs"],
  globals: {
    background: "dark",
  },
  parameters: {
    docs: {
      source: {
        transform: (code: string) => {
          return code
            .replace(new RegExp('<Button(\\s|>)', 'g'), '<Button.Root$1')
            .replace(new RegExp('</Button>', 'g'), '</Button.Root>')
            .replace(new RegExp('<ButtonText', 'g'), '<Button.Text')
            .replace(new RegExp('</ButtonText>', 'g'), '</Button.Text>')
            .replace(new RegExp('<ButtonIcon', 'g'), '<Button.Icon')
            .replace(new RegExp('</ButtonIcon>', 'g'), '</Button.Icon>')
        },
      },
    },
  },
  args: {
    variant: "primary",
    size: "medium",
    disabled: false,
  },
  argTypes: {
    onClick: { action: "clicked" },
    disabled: { control: { type: "boolean" } },
    variant: {
      options: ["primary", "secondary", "ghost", "transparent"],
      control: { type: "select" },
    },
    size: {
      options: ["medium", "small", "tiny"],
      control: { type: "inline-radio" },
    },
    customText: {
      control: { type: 'text' }
    },
  },
} as Meta<ButtonRootProps>;

export const Primary: StoryObj<ButtonRootProps & { customText: string }> = {
  args: {
    variant: "primary",
    customText: 'Primary Button'
  },
  render: ({ customText, ...args }) => (
    <Button.Root {...args}>
      <Button.Text value={customText} />
    </Button.Root>
  ),
};

export const Secondary: StoryObj<ButtonRootProps & { customText: string }> = {
  args: {
    variant: "secondary",
    customText: 'Secondary Button'
  },
  render: ({ customText, ...args }) => (
    <Button.Root {...args}>
      <Button.Text value={customText} />
    </Button.Root>
  ),
};

export const Ghost: StoryObj<ButtonRootProps & { customText: string }> = {
  args: {
    variant: "ghost",
    customText: 'Ghost Button'
  },
  render: ({ customText, ...args }) => (
    <Button.Root {...args}>
      <Button.Text value={customText} />
    </Button.Root>
  ),
};

export const Transparent: StoryObj<ButtonRootProps & { customText: string }> = {
  args: {
    variant: "transparent",
    customText: 'Transparent Button'
  },
  render: ({ customText, ...args }) => (
    <Button.Root {...args}>
      <Button.Text value={customText} />
    </Button.Root>
  ),
};

type ButtonWithIconArgs = ButtonRootProps & { customText: string, iconName: FaClassName };

export const WithIcon: StoryObj<ButtonWithIconArgs> = {
  args: {
    iconName: 'fa-solid fa-arrow-left',
    customText: 'Back'
  },
  argTypes: {
    iconName: {
      options: [...faClassNames],
      control: { type: "select" },
    }
  },
  render: ({ customText, iconName, ...args }) => (
    <Button.Root {...args}>
      <Button.Icon name={iconName} color={colors.surface.accent} />
      <Button.Text value={customText} />
    </Button.Root>
  ),
};

export const Disabled: StoryObj<ButtonRootProps & { customText: string }> = {
  args: {
    disabled: true,
    customText: 'Disabled Button',
  },
  render: ({ customText, ...args }) => (
    <Button.Root {...args}>
      <Button.Text value={customText} />
    </Button.Root>
  ),
};
