import type { Meta, StoryObj } from '@storybook/react';
import { Popup } from './Popup';

const meta: Meta<typeof Popup> = {
  title: 'UI/Modal/Popup',
  component: Popup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CancelButton: Story = {
  args: {
    isOpen: true,
    text: '게시물을 삭제하시겠습니까?',
    subText: '이 작업은 실행 취소할 수 없습니다.',
    buttonLabel: '게시물 삭제',
    useCancelButton: true,
    useCancelIcon: false,
  },
};

export const CancelIcon: Story = {
  args: {
    isOpen: true,
    text: '게시물을 삭제하시겠습니까?',
    subText: '이 작업은 실행 취소할 수 없습니다.',
    buttonLabel: '게시물 삭제',
    useCancelButton: false,
    useCancelIcon: true,
  },
};
