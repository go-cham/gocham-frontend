/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React, { useMemo } from 'react';
import Select, { OnChangeValue } from 'react-select';

import {
  OptionType,
  categoryOptions,
  jobOptions,
  residenceOptions,
} from '@/constants/Options';
import {
  CollectInformationBox,
  userInformationPropsType,
  userInformationType,
} from '@/pages/collect-information/CollectInformationPage';
import palette from '@/styles/color';

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
  const customStyles = useMemo(
    () => ({
      option: (provided: any, state: any) => ({
        ...provided,
        // border: "5px dotted red",
        textAlign: 'left',
        backgroundColor: null,
        fontSize: '1.2rem',
        color: 'rgba(42, 45, 55, 0.7)',

        // height: "2rem",
      }),
      control: (provided: any, state: any) => ({
        ...provided,
        // width: 200,
        background: 'rgba(0,0,0,0)',
        border: 0,
        boxSizing: 'border-box',
        boxShadow: null,
        borderColor: null,
        height: '5.5rem',
        fontSize: '1.2rem',
        color: 'rgba(42, 45, 55, 0.7)',
        borderRadius: 0,
        transition: 'border-width 0.1s ease-in-out',
        borderBottom: state.isFocused
          ? `0.4rem solid ${palette.Gray1}`
          : `0.2rem solid ${palette.Gray1}`,
      }),
      singleValue: (provided: any, state: any) => ({
        ...provided,
        color: palette.Secondary,
        fontSize: '1.2rem',
        fontWeight: '500',
      }),
      menu: (provided: any, state: any) => ({
        ...provided,
        borderRadius: '1.2rem',
        width: '15.5rem',
        right: 0,
      }),

      menuList: (provided: any, state: any) => ({
        ...provided,
        // maxHeight: "15rem",
      }),
      indicatorSeparator: () => ({ display: 'none' }),
    }),
    []
  );
  const customMultiStyles = useMemo(
    () => ({
      option: (provided: any, state: any) => ({
        ...provided,
        // border: "5px dotted red",
        textAlign: 'left',
        backgroundColor: null,
        fontSize: '1.2rem',
        color: 'rgba(42, 45, 55, 0.7)',
        // height: "2rem",
      }),
      control: (provided: any, state: any) => ({
        ...provided,
        // width: 200,
        background: 'rgba(0,0,0,0)',
        border: 0,
        boxSizing: 'border-box',
        boxShadow: null,
        borderColor: null,
        height: '4rem',
        fontSize: '1.2rem',
        color: 'rgba(42, 45, 55, 0.7)',
        borderRadius: 0,
        transition: 'border-width 0.1s ease-in-out',
        borderBottom: state.isFocused
          ? `0.4rem solid ${palette.Gray1}`
          : `0.2rem solid ${palette.Gray1}`,
      }),
      ValueContainer: (provided: any, state: any) => ({
        ...provided,
        height: '2.5rem',
      }),
      singleValue: (provided: any, state: any) => ({
        ...provided,
        color: palette.Secondary,
        fontSize: '1.2rem',
        fontWeight: '500',
      }),
      multiValue: (provided: any, state: any) => ({
        ...provided,
        color: palette.Secondary,
        fontSize: '1.28rem',
        fontWeight: '500',
      }),
      menu: (provided: any, state: any) => ({
        ...provided,
        borderRadius: '1.2rem',
      }),

      menuList: (provided: any, state: any) => ({
        ...provided,
        // maxHeight: "15rem",
      }),
      indicatorSeparator: () => ({ display: 'none' }),
      dropdownIndicator: (provided: any, state: any) => ({
        ...provided,
        display: 'none',
      }),
      clearIndicator: (provided: any, state: any) => ({
        ...provided,
        display: 'none',
      }),
      valueContainer: (provided: any, state: any) => ({
        ...provided,
        height: 'rem',
      }),
    }),
    []
  );

  return (
    <CollectInformationBox>
      <OverflowInputWrap>
        <h2>거주지역</h2>
        <Select
          isSearchable={false}
          styles={customStyles}
          options={residenceOptions}
          value={userInformation.residence}
          onChange={(e) => handleInputValue(e, 'residence')}
        />
      </OverflowInputWrap>
      <OverflowInputWrap>
        <h2>직업</h2>
        <Select
          isSearchable={false}
          styles={customStyles}
          options={jobOptions}
          value={userInformation.job}
          onChange={(e) => handleInputValue(e, 'job')}
        />
      </OverflowInputWrap>
      <OverflowInputWrap>
        <h2>관심 카테고리</h2>
        <MultiPickerComponent
          categoryOptions={categoryOptions}
          selectedValue={userInformation.worryCategories}
          clickAction={(item) =>
            handleInputValueWithCustomComponent(item, 'worryCategories')
          }
        />
        {/*<Select*/}
        {/*  isMulti*/}
        {/*  closeMenuOnSelect={false}*/}
        {/*  isSearchable={false}*/}
        {/*  styles={customStyles}*/}
        {/*  options={categoryOptions}*/}
        {/*  value={userInformation.worryCategories}*/}
        {/*  onChange={(e) => handleInputValue(e, "worryCategories")}*/}
        {/*/>*/}
      </OverflowInputWrap>
    </CollectInformationBox>
  );
};

export default CollectNicknameAgeGender;

const OverflowInputWrap = styled.div`
  height: 7.5rem;
  overflow-y: visible;
`;
