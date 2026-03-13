import type { StoryObj, Meta } from "@storybook/react-vite";
import { Icon, TextInput, type TextInputRootProps } from "@queoponents/react";

export default {
  title: "Components/TextInput",
  component: TextInput.Root,
  tags: ["autodocs"],
  args: {
    disabled: false,
    active: false,
  },
  argTypes: {
    disabled: { control: { type: "boolean" } },
    active: {
      if: { arg: "disabled", eq: false },
      control: { type: "boolean" },
    },
  },
} as Meta<TextInputRootProps>;

export const Primary: StoryObj<TextInputRootProps> = {
  render: (args) => (
    <TextInput.Root {...args}>
      <TextInput.Label>Email</TextInput.Label>
      <TextInput.Control>
        <TextInput.Input placeholder="Digite seu e-mail" type="email" />
      </TextInput.Control>
    </TextInput.Root>
  ),
};

export const TypePassword: StoryObj<TextInputRootProps> = {
  render: (args) => (
    <TextInput.Root {...args}>
      <TextInput.Label>Senha</TextInput.Label>
      <TextInput.Control>
        <TextInput.Input placeholder="Digite sua senha" type="password" />
      </TextInput.Control>
    </TextInput.Root>
  ),
};

export const WithoutLabel: StoryObj<TextInputRootProps> = {
  render: (args) => (
    <TextInput.Root {...args}>
      <TextInput.Control>
        <TextInput.Input placeholder="Digite algo..." />
      </TextInput.Control>
    </TextInput.Root>
  ),
};

export const Disabled: StoryObj<TextInputRootProps> = {
  args: {
    disabled: true,
    active: false,
  },
  render: (args) => (
    <TextInput.Root {...args}>
      <TextInput.Label>Desabilitado</TextInput.Label>
      <TextInput.Control>
        <TextInput.Input placeholder="Você não pode digitar aqui" />
      </TextInput.Control>
    </TextInput.Root>
  ),
};

export const WithIcon: StoryObj<TextInputRootProps & { side: "left" | "right" }> = {
  args: {
    side: "right",
  },
  argTypes: {
    side: {
      options: ["left", "right"],
      control: { type: "inline-radio" },
    },
  },
  render: ({ side, ...args }) => (
    <TextInput.Root {...args}>
      <TextInput.Label>Senha</TextInput.Label>
      <TextInput.Control>
        <TextInput.Input type="password" placeholder="Digite sua senha" />
      </TextInput.Control>
      <TextInput.Slot animated={true}>
        <Icon name='fa-solid fa-circle-question' />
      </TextInput.Slot>
    </TextInput.Root>
  ),
};
