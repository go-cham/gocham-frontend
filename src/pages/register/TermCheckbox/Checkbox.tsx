import { Dispatch } from 'react';

import EmptyCheckIcon from '@/images/Login/empty_check_box.png';
import FillCheckIcon from '@/images/Login/fill_check_box.png';

type CheckboxProps = {
  value: boolean;
  setValue: Dispatch<any>;
};

export default function Checkbox({ value, setValue }: CheckboxProps) {
  return (
    <div>
      {value ? (
        <img
          src={FillCheckIcon}
          alt={'fill checkbox'}
          onClick={() => setValue(!value)}
        />
      ) : (
        <img
          src={EmptyCheckIcon}
          alt={'empty checkbox'}
          onClick={() => setValue(!value)}
        />
      )}
    </div>
  );
}
