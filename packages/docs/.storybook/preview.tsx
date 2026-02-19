import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@queoponents/react';
import { themes } from 'storybook/theming';

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
    }
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
