import type { Meta, StoryObj } from '@storybook/react';

import CommentSkeleton from '@/components/ui/skeleton/CommentSkeleton/CommentSkeleton';

const meta = {
  title: 'UI/Skeleton/Comment',
  component: CommentSkeleton,
} satisfies Meta<typeof CommentSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'w-[39rem]',
  },
};
