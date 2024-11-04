import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  colors: {
    telegram: ['#3390ec', '#3390ec', '#3390ec', '#3390ec', '#3390ec', '#3390ec', '#3390ec', '#3390ec', '#3390ec', '#3390ec'],
  },
  primaryColor: 'telegram',
  components: {
    Button: {
      defaultProps: {
        color: 'telegram',
      },
    },
  },
};
