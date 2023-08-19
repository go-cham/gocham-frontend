import type { Meta, StoryObj } from '@storybook/react';
import { getRemainingTime } from '@/features/posts/utils/get-remaining-time';
import { PostExpiration } from './PostExpiration';

const meta = {
  title: 'Post/PostDetail/PostExpiration',
  component: PostExpiration,
  tags: ['autodocs'],
} satisfies Meta<typeof PostExpiration>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    remainingTime: getRemainingTime('closed')!,
  },
};

export const Expired: Story = {
  args: {
    remainingTime: getRemainingTime('closed')!,
  },
};
