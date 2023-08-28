import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Selections/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NotChecked: Story = {
  args: {
    id: 'checkbox1',
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    id: 'checkbox2',
    checked: true,
  },
};
