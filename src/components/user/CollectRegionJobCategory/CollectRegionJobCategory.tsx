import Select, { OnChangeValue, StylesConfig } from 'react-select';

import InputLayout from '@/components/input/InputLayout';
import {
  OptionType,
  categoryOptions,
  jobOptions,
  residenceOptions,
} from '@/constants/Options';
import palette from '@/styles/color';
import { userInformationPropsType, userInformationType } from '@/types/user';

import MultiPickerComponent from './MultiPickerComponent';

const CollectNicknameAgeGender = ({
  userInformation,
  setUserInformation,
}: userInformationPropsType) => {
  const handleInputValue = (e: OnChangeValue<OptionType, any>, key: string) => {
    setUserInformation((value: userInformationType) => ({
      ...value,
      [key]: e,
    }));
  };
  const handleInputValueWithCustomComponent = (item: number, key: string) => {
    // 이코드는 item이 리스트여야함
    setUserInformation((value: userInformationType) => ({
      ...value,
      [key]: item,
    }));
  };
  const customStyles: StylesConfig = {
    option: (baseStyles) => ({
      ...baseStyles,
      textAlign: 'left',
      backgroundColor: undefined,
      fontSize: '1.2rem',
      color: 'rgba(42, 45, 55, 0.7)',
    }),
    control: (baseStyles) => ({
      ...baseStyles,
      background: 'rgba(0,0,0,0)',
      border: 0,
      boxSizing: 'border-box',
      boxShadow: undefined,
      borderColor: undefined,
      fontSize: '1.2rem',
      color: 'rgba(42, 45, 55, 0.7)',
      borderRadius: 0,
      transition: 'border-width 0.1s ease-in-out',
    }),
    singleValue: (baseStyles) => ({
      ...baseStyles,
      color: palette.Secondary,
      fontSize: '1.2rem',
      fontWeight: '500',
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      borderRadius: '1.2rem',
      width: '15.5rem',
      right: 0,
    }),

    menuList: (baseStyles) => ({
      ...baseStyles,
    }),
    indicatorSeparator: () => ({ display: 'none' }),
  };

  return (
    <div className="space-y-[2.4rem]">
      <InputLayout label="거주지역">
        <Select
          isSearchable={false}
          styles={customStyles}
          options={residenceOptions}
          value={userInformation.residence}
          onChange={(e) => handleInputValue(e as any, 'residence')}
        />
      </InputLayout>
      <InputLayout label="직업">
        <Select
          isSearchable={false}
          styles={customStyles}
          options={jobOptions}
          value={userInformation.job}
          onChange={(e) => handleInputValue(e as any, 'job')}
        />
      </InputLayout>
      <div>
        <label className="text-[1.2rem]">관심 카테고리</label>
        <MultiPickerComponent
          categoryOptions={categoryOptions}
          selectedValue={userInformation.worryCategories}
          clickAction={(item) =>
            handleInputValueWithCustomComponent(item, 'worryCategories')
          }
        />
      </div>
    </div>
  );
};

export default CollectNicknameAgeGender;
