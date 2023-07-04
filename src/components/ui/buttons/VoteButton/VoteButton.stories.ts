import type { Meta, StoryObj } from '@storybook/react';

import VoteButton from '@/components/ui/buttons/VoteButton/VoteButton';

const meta = {
  title: 'UI/Buttons/VoteButton',
  component: VoteButton,
  tags: ['autodocs'],
} satisfies Meta<typeof VoteButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'input',
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    children: 'input',
    selected: true,
  },
};

export const DefaultWithImage: Story = {
  args: {
    children: 'input',
    selected: false,
    image:
      'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FLuWhQ%2FbtrYap1Nsaw%2Fet0ArKJd4VrzBjZBGNu6W1%2Fimg.jpg',
  },
};

export const SelectedWithImage: Story = {
  args: {
    children: 'input',
    selected: true,
    image:
      'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FLuWhQ%2FbtrYap1Nsaw%2Fet0ArKJd4VrzBjZBGNu6W1%2Fimg.jpg',
  },
};
