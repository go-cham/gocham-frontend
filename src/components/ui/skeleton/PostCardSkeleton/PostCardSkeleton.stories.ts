import type { Meta, StoryObj } from '@storybook/react';

import PostCardSkeleton from '@/components/ui/skeleton/PostCardSkeleton';

const meta = {
  title: 'UI/Skeleton/PostCard',
  component: PostCardSkeleton,
} satisfies Meta<typeof PostCardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
