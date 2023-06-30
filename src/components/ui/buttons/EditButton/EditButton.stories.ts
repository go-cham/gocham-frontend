import type { Meta, StoryObj } from '@storybook/react';

import EditButton from '@/components/ui/buttons/EditButton/EditButton';

const meta = {
  title: 'UI/Buttons/EditButton',
  component: EditButton,
  tags: ['autodocs'],
} satisfies Meta<typeof EditButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'button',
    onClick: () => console.log('clicked!'),
  },
};

export const Disabled: Story = {
  args: {
    children: 'button',
    disabled: true,
  },
};
