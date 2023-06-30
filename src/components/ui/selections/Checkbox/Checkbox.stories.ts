import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from '@/components/ui/selections/Checkbox';

const meta = {
  title: 'UI/Selections/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotChecked: Story = {
  args: {
    id: 'checkbox1',
    defaultChecked: false,
  },
};

export const Checked: Story = {
  args: {
    id: 'checkbox2',
    defaultChecked: true,
  },
};
