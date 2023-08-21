import type { Meta, StoryObj } from '@storybook/react';
import { PercentageBar } from './PercentageBar';

const meta = {
  title: 'Vote/PercentageBar',
  component: PercentageBar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="my-[10rem] ml-20 w-[30rem] space-y-[5rem]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PercentageBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    percentage: 50,
    colored: true,
    accented: true,
    useAnimation: true,
    useCharacter: true,
  },
};
