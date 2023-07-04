import type { Meta, StoryObj } from '@storybook/react';

import FloatingButton from '@/components/ui/buttons/FloatingButton/index';

const meta = {
  title: 'UI/Buttons/FloatingButton',
  component: FloatingButton,
  tags: ['autodocs'],
} satisfies Meta<typeof FloatingButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'button',
  },
};
