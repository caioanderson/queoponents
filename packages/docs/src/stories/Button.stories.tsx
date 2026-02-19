import type { StoryObj, Meta } from "@storybook/react-vite";
import { Button, type ButtonProps } from "@queoponents/react";

type StoryProps = ButtonProps & {
  buttonText: string;
}

export default {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  globals: {
    background: 'dark',
  },
  args: {
    children: "Click me!",
    variant: "primary",
    disabled: false,
  },
  argTypes: {
    onClick: { action: "clicked" },
    disabled: { type: "boolean" },
    variant: {
      options: ["primary", "secondary"],
      control: { type: "inline-radio" },
    },
  },
} as Meta;

export const Primary: StoryObj<StoryProps> = {
  args: {
    buttonText: 'Click me!',
    variant: "primary",
  },
  render: ({ buttonText, ...args }) => {
    return <Button {...args}>{buttonText}</Button>
  }
};

export const Secondary: StoryObj<StoryProps> = {
  args: {
    buttonText: 'Click me!',
    variant: "secondary",
  },
  render: ({ buttonText, ...args }) => {
    return <Button {...args}>{buttonText}</Button>
  }
};

export const Disabled: StoryObj<StoryProps> = {
  args: {
    buttonText: 'I am disabled.',
    variant: "primary",
    disabled: true,
  },
  render: ({ buttonText, ...args }) => {
    return <Button {...args}>{buttonText}</Button>
  }
};
