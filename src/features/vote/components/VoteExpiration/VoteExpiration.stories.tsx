import type { Meta, StoryObj } from '@storybook/react';
import { getRemainingTime } from '@/features/posts/utils/get-remaining-time';
import VoteExpiration from '@/features/vote/components/VoteExpiration';

const meta = {
  title: 'Post/PostDetail/PostExpiration',
  component: VoteExpiration,
  tags: ['autodocs'],
} satisfies Meta<typeof VoteExpiration>;

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
