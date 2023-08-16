import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

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
  },
};

export const Line: Story = {
  args: {
    variant: 'line',
    children: 'button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'button',
    disabled: true,
  },
};
