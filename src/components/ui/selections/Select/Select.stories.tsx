import type { Meta, StoryObj } from '@storybook/react';

import Select from '@/components/ui/selections/Select';

const meta: Meta<typeof Select> = {
  title: 'UI/Selections/Select',
  component: Select,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const OPTIONS = [
  {
    value: 'option1',
    name: '옵션 1',
  },
  {
    value: 'option2',
    name: '옵션 2',
  },
  {
    value: 'option3',
    name: '옵션 3',
  },
  {
    value: 'option4',
    name: '옵션 4',
  },
];

export const Default: Story = {
  args: {
    id: 'select',
    label: '라벨',
    options: OPTIONS,
    placeholder: '플레이스 홀더',
    onChange: (value) => console.log(value),
  },
};

export const Error: Story = {
  args: {
    id: 'select',
    label: '라벨',
    options: OPTIONS,
    placeholder: '플레이스 홀더',
    errorMessage: '에러 메시지',
    onChange: (value) => console.log(value),
  },
};

export const PostSelect: Story = {
  args: {
    id: 'select',
    label: '라벨',
    options: OPTIONS,
    placeholder: '플레이스 홀더',
    labelClassName: 'text-subheading',
    wrapperClassName: 'w-[15.7rem]',
    onChange: (value) => console.log(value),
  },
};
