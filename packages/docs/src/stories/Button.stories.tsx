import type { StoryObj, Meta } from "@storybook/react-vite";
import { Button, type ButtonRootProps, type FaClassName } from "@queoponents/react";

export default {
  title: "Components/Button",
  component: Button.Root,
  tags: ["autodocs"],
  globals: {
    background: 'dark',
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
    iconClassName: {
      control: { type: "text" },
    },
  },
} as Meta<ButtonRootProps>;

export const Primary: StoryObj<ButtonRootProps> = {
  args: {
    variant: "primary",
  },
  render: (args) => (
    <Button.Root {...args}>
      <Button.Text>Primary Button</Button.Text>
    </Button.Root>
  ),
};

export const Secondary: StoryObj<ButtonRootProps> = {
  args: {
    variant: "secondary",
  },
  render: (args) => (
    <Button.Root {...args}>
      <Button.Text>Secondary Button</Button.Text>
    </Button.Root>
  ),
};

export const Ghost: StoryObj<ButtonRootProps> = {
  args: {
    variant: "ghost",
  },
  render: (args) => (
    <Button.Root {...args}>
      <Button.Text>Ghost Button</Button.Text>
    </Button.Root>
  ),
};

export const Transparent: StoryObj<ButtonRootProps> = {
  args: {
    variant: "transparent",
  },
  render: (args) => (
    <Button.Root {...args}>
      <Button.Text>Transparent Button</Button.Text>
    </Button.Root>
  ),
};

type ButtonWithIconArgs = ButtonRootProps & { iconClassName: FaClassName };

export const WithIcon: StoryObj<ButtonWithIconArgs> = {
  args: {
    iconClassName: 'fa-solid fa-arrow-left'
  },
  render: ({ iconClassName, ...args }) => (
    <Button.Root {...args}>
      <Button.Icon name={iconClassName} />
      <Button.Text>Back</Button.Text>
    </Button.Root>
  ),
};

export const Disabled: StoryObj<ButtonRootProps> = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Button.Root {...args}>
      <Button.Text>Disabled Button</Button.Text>
    </Button.Root>
  ),
};
