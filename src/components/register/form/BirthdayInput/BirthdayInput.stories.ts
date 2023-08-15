import type { Meta, StoryObj } from '@storybook/react';

import BirthDateInput from '@/components/register/form/BirthDateInput/BirthDateInput';

const meta: Meta<typeof BirthDateInput> = {
  title: 'Register/inputs/BirthDateInput',
  component: BirthDateInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Success: Story = {
  args: {
    successMessage: '성공 메시지',
  },
};

export const Error: Story = {
  args: {
    errorMessage: '에러 메시지',
  },
};
