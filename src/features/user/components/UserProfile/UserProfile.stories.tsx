import { Meta, StoryObj } from '@storybook/react';
import UserProfile from '@/features/user/components/UserProfile';

const meta: Meta<typeof UserProfile> = {
  title: 'UserProfile',
  component: UserProfile,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BaseSize: Story = {
  args: {
    isAdmin: false,
    age: 25,
    nickname: '테스트닉네임',
  },
};

export const LargeSize: Story = {
  args: {
    isAdmin: false,
    age: 25,
    nickname: '테스트닉네임',
    size: 'large',
  },
};

export const OverMaxAgeRange: Story = {
  args: {
    isAdmin: false,
    age: 66,
    nickname: '테스트닉네임',
  },
};

export const AdminBase: Story = {
  args: {
    isAdmin: true,
    age: 25,
    nickname: '관리자계정',
  },
};

export const AdminLarge: Story = {
  args: {
    isAdmin: true,
    age: 25,
    nickname: '관리자계정',
    size: 'large',
  },
};
