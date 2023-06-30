import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/ui/Button';

const meta = {
  title: 'UI/Buttons/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'button',
    onClick: () => console.log('clicked!'),
  },
};

export const Line: Story = {
  args: {
    variant: 'line',
    children: 'button',
    onClick: () => console.log('clicked!'),
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'button',
    disabled: true,
    onClick: () => console.log('clicked!'),
  },
};
