import type { Meta, StoryObj } from '@storybook/react';

import Snackbar from '@/components/ui/modal/Snackbar';

const meta = {
  title: 'UI/Modal/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoAction: Story = {
  args: {
    text: 'text',
  },
};

export const Action: Story = {
  args: {
    text: 'text',
    actionText: 'button',
  },
};
