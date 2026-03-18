import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@queoponents/react';
import { themes } from 'storybook/theming';
import './style.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#121212' }],
    },
    docs: {
      theme: themes.dark,
    },
    options: {
      storySort: {
        order: [
          'Home',
          'Tokens',
          ['Getting Started', 'Colors', 'Typograph', 'Icons'],
          'Surfaces',
          ['Box'],
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
