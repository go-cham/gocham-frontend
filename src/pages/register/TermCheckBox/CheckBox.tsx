import { Dispatch } from 'react';

import EmptyCheckIcon from '@/images/Login/empty_check_box.png';
import FillCheckIcon from '@/images/Login/fill_check_box.png';

type CheckBoxType = {
  value: boolean;
  setValue: Dispatch<any>;
};

const CheckBox = ({ value, setValue }: CheckBoxType) => {
  return (
    <div>
      {value ? (
        <img
          src={FillCheckIcon}
          alt={'fill check box'}
          onClick={() => setValue(!value)}
        />
      ) : (
        <img
          src={EmptyCheckIcon}
          alt={'empty check box'}
          onClick={() => setValue(!value)}
        />
      )}
    </div>
  );
};
export default CheckBox;
