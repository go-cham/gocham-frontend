import type { Meta, StoryObj } from '@storybook/react';

import PostVoteInput from '@/components/post/form/PostVoteInput';

const meta: Meta<typeof PostVoteInput> = {
  title: 'Post/inputs/PostVoteInput',
  component: PostVoteInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithImage: Story = {
  args: {
    image:
      'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FLuWhQ%2FbtrYap1Nsaw%2Fet0ArKJd4VrzBjZBGNu6W1%2Fimg.jpg',
  },
};

export const Error: Story = {
  args: {
    error: '에러 메시지',
  },
};
