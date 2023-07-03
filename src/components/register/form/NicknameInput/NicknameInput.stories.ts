import type { Meta, StoryObj } from '@storybook/react';

import NicknameInput from '@/components/register/form/NicknameInput';

const meta: Meta<typeof NicknameInput> = {
  title: 'Register/inputs/NicknameInput',
  component: NicknameInput,
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
