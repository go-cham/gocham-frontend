import type { Meta, StoryObj } from '@storybook/react';
import PostSummarySkeleton from '@/common/components/ui/skeleton/PostSummarySkeleton/PostSummarySkeleton';

const meta = {
  title: 'UI/Skeleton/PostSummary',
  component: PostSummarySkeleton,
} satisfies Meta<typeof PostSummarySkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'w-[39rem]',
  },
};
