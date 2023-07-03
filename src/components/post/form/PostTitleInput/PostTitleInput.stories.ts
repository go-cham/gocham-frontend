import type { Meta, StoryObj } from '@storybook/react';
import PostTitleInput from 'src/components/post/form/PostTitleInput';

const meta: Meta<typeof PostTitleInput> = {
  title: 'Post/inputs/PostTitleInput',
  component: PostTitleInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Error: Story = {
  args: {
    errorMessage: '에러 메시지',
  },
};
