import { IconFlag } from '@tabler/icons-react';

export const PRIORITY_DATA = [
  {
    value: 'low',
    label: 'Low Priority',
    color: 'green',
    description: 'Can be done when convenient',
    icon: IconFlag,
    styles: {
      backgroundColor: 'var(--mantine-color-green-1)',
      hoverColor: 'var(--mantine-color-green-2)',
      selectedColor: 'var(--mantine-color-green-6)',
    },
  },
  {
    value: 'medium',
    label: 'Medium Priority',
    color: 'yellow',
    description: 'Should be done soon',
    icon: IconFlag,
    styles: {
      backgroundColor: 'var(--mantine-color-yellow-1)',
      hoverColor: 'var(--mantine-color-yellow-2)',
      selectedColor: 'var(--mantine-color-yellow-6)',
    },
  },
  {
    value: 'high',
    label: 'High Priority',
    color: 'red',
    description: 'Needs immediate attention',
    icon: IconFlag,
    styles: {
      backgroundColor: 'var(--mantine-color-red-1)',
      hoverColor: 'var(--mantine-color-red-2)',
      selectedColor: 'var(--mantine-color-red-6)',
    },
  },
] as const;
