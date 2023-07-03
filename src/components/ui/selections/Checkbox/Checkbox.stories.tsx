import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from '@/components/ui/selections/Checkbox';

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
    defaultChecked: false,
    onChange: (checked) => console.log(checked ? 'Checked!' : 'Not checked!'),
  },
};

export const Checked: Story = {
  args: {
    id: 'checkbox2',
    defaultChecked: true,
    onChange: (checked) => console.log(checked ? 'Checked!' : 'Not checked!'),
  },
};
