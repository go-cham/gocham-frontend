import type { Meta, StoryObj } from '@storybook/react';
import Chip from '@/common/components/ui/buttons/Chip';

const meta = {
  title: 'UI/Buttons/Chip',
  component: Chip,
  tags: ['autodocs'],
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Input',
  },
};

export const Delete: Story = {
  args: {
    label: 'Input',
    variant: 'delete',
  },
};

export const Gray: Story = {
  args: {
    label: 'Input',
    variant: 'gray',
  },
};
