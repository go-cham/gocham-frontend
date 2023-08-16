import type { Meta, StoryObj } from '@storybook/react';

import PostDetailSkeleton from '@/common/components/ui/skeleton/PostDetailSkeleton/index';

const meta = {
  title: 'UI/Skeleton/PostDetail',
  component: PostDetailSkeleton,
} satisfies Meta<typeof PostDetailSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
