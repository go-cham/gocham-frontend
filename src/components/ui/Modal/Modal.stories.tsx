import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import Modal from '@/components/ui/Modal/Modal';
import Button from '@/components/ui/buttons/Button';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>모달 열기</Button>
        <Modal
          isOpen={isOpen}
          text="게시물을 삭제하시겠습니까?"
          subText="이 작업은 실행 취소할 수 없습니다."
          buttonLabel="게시물 삭제"
          onCancel={() => setIsOpen(false)}
        />
      </div>
    );
  },
};
