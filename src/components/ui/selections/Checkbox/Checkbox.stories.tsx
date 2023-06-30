import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

import Checkbox from '@/components/ui/selections/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Selections/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NotChecked: Story = {
  render: () => {
    type FormData = {
      checkbox1: boolean;
    };
    const { control, watch } = useForm<FormData>({
      defaultValues: {
        checkbox1: false,
      },
    });

    const checked = watch('checkbox1');

    return (
      <div>
        {checked && <p className="mb-10">Checked!</p>}
        {!checked && <p className="mb-10">Not checked!</p>}

        <Checkbox id="checkbox1" control={control} name="checkbox1" />
      </div>
    );
  },
};

export const Checked: Story = {
  render: () => {
    type FormData = {
      checkbox2: boolean;
    };
    const { control, watch } = useForm<FormData>({
      defaultValues: {
        checkbox2: true,
      },
    });

    const checked = watch('checkbox2');

    return (
      <div>
        {checked && <p className="mb-10">Checked!</p>}
        {!checked && <p className="mb-10">Not checked!</p>}

        <Checkbox id="checkbox2" control={control} name="checkbox2" />
      </div>
    );
  },
};
