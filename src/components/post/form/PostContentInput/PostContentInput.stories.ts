import type { Meta, StoryObj } from '@storybook/react';

import PostContentInput from '@/components/post/form/PostContentInput/PostContentInput';

const meta: Meta<typeof PostContentInput> = {
  title: 'Post/inputs/PostContentInput',
  component: PostContentInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Error: Story = {
  args: {
    error: '에러 메시지',
  },
};
