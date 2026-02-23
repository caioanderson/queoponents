import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@queoponents/react';
import { themes } from 'storybook/theming';
import './style.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#121212' },
        // { name: 'light', value: '#ffffff' },
      ],
    },
    docs: {
      theme: themes.dark,
    },
    options: {
      storySort: {
        order: [
          'Tokens', ['Getting Started', 'Colors', 'Typography'],
        ],
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
