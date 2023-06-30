import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

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
  render: () => {
    const { control, watch } = useForm();
    const value = watch('select');

    return (
      <div>
        {value && <p className="mb-10">선택된 값은 {watch('select')}입니다.</p>}
        {!value && <p className="mb-10">선택된 값이 없습니다.</p>}

        <Select
          id="select"
          label="라벨"
          options={OPTIONS}
          placeholder="플레이스 홀더"
          name="select"
          control={control}
        />
      </div>
    );
  },
};

export const Error: Story = {
  render: () => {
    type FormData = {
      select: string;
    };

    const { control, watch } = useForm<FormData>({
      defaultValues: {
        select: 'option2',
      },
    });
    const value = watch('select');

    return (
      <div>
        {value && <p className="mb-10">선택된 값은 {watch('select')}입니다.</p>}
        {!value && <p className="mb-10">선택된 값이 없습니다.</p>}

        <Select
          id="select"
          label="라벨"
          options={OPTIONS}
          placeholder="플레이스 홀더"
          error="에러가 발생했습니다"
          name="select"
          control={control}
        />
      </div>
    );
  },
};
