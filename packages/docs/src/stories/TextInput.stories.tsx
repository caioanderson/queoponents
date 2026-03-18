import type { StoryObj, Meta } from "@storybook/react-vite";
import { faClassNames, Icon, TextInput, type TextInputRootProps } from "@queoponents/react";
import { colors } from '@queoponents/tokens'

export default {
  title: "Components/TextInput",
  component: TextInput.Root,
  tags: ["autodocs"],
  globals: {
    background: "dark",
  },
  parameters: {
    docs: {
      source: {
        transform: (code: string) => {
          return code
            .replace(new RegExp('<TextInput(\\s|>)', 'g'), '<TextInput.Root$1')
            .replace(new RegExp('</TextInput>', 'g'), '</TextInput.Root>')
            .replace(new RegExp('<TextInputLabel', 'g'), '<TextInput.Label')
            .replace(new RegExp('</TextInputLabel>', 'g'), '</TextInput.Label>')
            .replace(new RegExp('<TextInputControl', 'g'), '<TextInput.Control')
            .replace(new RegExp('</TextInputControl>', 'g'), '</TextInput.Control>')
            .replace(new RegExp('<TextInputInput', 'g'), '<TextInput.Input')
            .replace(new RegExp('</TextInputInput>', 'g'), '</TextInput.Input>')
            .replace(new RegExp('<TextInputSlot', 'g'), '<TextInput.Slot')
            .replace(new RegExp('</TextInputSlot>', 'g'), '</TextInput.Slot>')
        },
      },
    },
  },
  args: {
    disabled: false,
    active: false,
  },
  argTypes: {
    disabled: { control: { type: "boolean" } },
    label: { control: { type: "text" } },
    placeholder: { control: { type: "text" } },
    type: {
      options: ["text", "email", "password", "search", "tel", "url"],
      control: { type: "select" },
    },
    active: {
      if: { arg: "disabled", eq: false },
      control: { type: "boolean" },
    },
  },
} as Meta<TextInputRootProps>;

type TextInputStoryArgs = TextInputRootProps & {
  label?: string;
  placeholder?: string;
  type?: string;
  iconName?: string;
};

export const Primary: StoryObj<TextInputStoryArgs> = {
  args: {
    label: "Email",
    placeholder: "Digite seu e-mail",
    type: "email",
  },
  render: ({ label, placeholder, type, ...args }) => (
    <TextInput.Root {...args}>
      {label && <TextInput.Label>{label}</TextInput.Label>}
      <TextInput.Control>
        <TextInput.Input placeholder={placeholder} type={type} />
      </TextInput.Control>
    </TextInput.Root>
  ),
};

export const Disabled: StoryObj<TextInputStoryArgs> = {
  args: {
    disabled: true,
    active: false,
    label: "Desabilitado",
    placeholder: "Você não pode digitar aqui",
    type: "text",
  },
  render: ({ label, placeholder, type, ...args }) => (
    <TextInput.Root {...args}>
      {label && <TextInput.Label>{label}</TextInput.Label>}
      <TextInput.Control>
        <TextInput.Input placeholder={placeholder} type={type} />
      </TextInput.Control>
    </TextInput.Root>
  ),
};

export const WithIcon: StoryObj<TextInputStoryArgs> = {
  args: {
    label: "Senha",
    placeholder: "Digite sua senha",
    type: "password",
    iconName: 'fa-solid fa-circle-question',
  },
  argTypes: {
    iconName: {
      options: [...faClassNames],
      control: { type: "select" },
    }
  },
  render: ({ type, iconName, placeholder, label, ...args }) => (
    <TextInput.Root {...args}>
      {label && <TextInput.Label>{label}</TextInput.Label>}
      <TextInput.Control>
        <TextInput.Input type={type} placeholder={placeholder} />
      </TextInput.Control>
      <TextInput.Slot>
        <Icon name={iconName as any} color={colors.theme.state.active} />
      </TextInput.Slot>
    </TextInput.Root>
  ),
};
