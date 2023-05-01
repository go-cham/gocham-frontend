/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import palette from "../../style/color";
import {
  CollectInformationBox,
  userInformationPropsType,
  userInformationType,
} from "../../_pages/collectInformation/CollectInformation";
import React, { useMemo } from "react";
import { ButtonStyle } from "../../style/common";
import Select, {
  OnChangeValue,
  IndicatorSeparatorProps,
  StylesConfig,
} from "react-select";
import {
  categoryOptions,
  jobOptions,
  OptionType,
  residenceOptions,
} from "../../constants/Options";

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
  const customStyles = useMemo(
    () => ({
      option: (provided: any, state: any) => ({
        ...provided,
        // border: "5px dotted red",
        textAlign: "left",
        backgroundColor: null,
        fontSize: "1.2rem",
        color: "rgba(42, 45, 55, 0.7)",
        // height: "2rem",
      }),
      control: (provided: any, state: any) => ({
        ...provided,
        // width: 200,
        background: "rgba(0,0,0,0)",
        border: 0,
        boxSizing: "border-box",
        boxShadow: null,
        borderColor: null,
        height: "5.5rem",
        fontSize: "1.2rem",
        color: "rgba(42, 45, 55, 0.7)",
        borderRadius: 0,
        transition: "border-width 0.1s ease-in-out",
        borderBottom: state.isFocused
          ? `0.4rem solid ${palette.Gray1}`
          : `0.2rem solid ${palette.Gray1}`,
      }),
      singleValue: (provided: any, state: any) => ({
        ...provided,
        color: palette.Secondary,
        fontSize: "1.2rem",
        fontWeight: "500",
      }),
      menu: (provided: any, state: any) => ({
        ...provided,
        borderRadius: "1.2rem",
      }),

      menuList: (provided: any, state: any) => ({
        ...provided,
        // maxHeight: "15rem",
      }),
      indicatorSeparator: () => ({ display: "none" }),
    }),
    []
  );
  const customMultiStyles = useMemo(
    () => ({
      option: (provided: any, state: any) => ({
        ...provided,
        // border: "5px dotted red",
        textAlign: "left",
        backgroundColor: null,
        fontSize: "1.2rem",
        color: "rgba(42, 45, 55, 0.7)",
        // height: "2rem",
      }),
      control: (provided: any, state: any) => ({
        ...provided,
        // width: 200,
        background: "rgba(0,0,0,0)",
        border: 0,
        boxSizing: "border-box",
        boxShadow: null,
        borderColor: null,
        height: "4rem",
        fontSize: "1.2rem",
        color: "rgba(42, 45, 55, 0.7)",
        borderRadius: 0,
        transition: "border-width 0.1s ease-in-out",
        borderBottom: state.isFocused
          ? `0.4rem solid ${palette.Gray1}`
          : `0.2rem solid ${palette.Gray1}`,
      }),
      ValueContainer: (provided: any, state: any) => ({
        ...provided,
        height: "2.5rem",
      }),
      singleValue: (provided: any, state: any) => ({
        ...provided,
        color: palette.Secondary,
        fontSize: "1.2rem",
        fontWeight: "500",
      }),
      multiValue: (provided: any, state: any) => ({
        ...provided,
        color: palette.Secondary,
        fontSize: "1.28rem",
        fontWeight: "500",
      }),
      menu: (provided: any, state: any) => ({
        ...provided,
        borderRadius: "1.2rem",
      }),

      menuList: (provided: any, state: any) => ({
        ...provided,
        // maxHeight: "15rem",
      }),
      indicatorSeparator: () => ({ display: "none" }),
      dropdownIndicator: (provided: any, state: any) => ({
        ...provided,
        display: "none",
      }),
      clearIndicator: (provided: any, state: any) => ({
        ...provided,
        display: "none",
      }),
      valueContainer: (provided: any, state: any) => ({
        ...provided,
        height: "rem",
      }),
    }),
    []
  );

  return (
    <CollectInformationBox>
      <h2>거주지역</h2>
      <Select
        isSearchable={false}
        styles={customStyles}
        options={residenceOptions}
        value={userInformation.residence}
        onChange={(e) => handleInputValue(e, "residence")}
      />
      <h2>직업</h2>
      <Select
        isSearchable={false}
        styles={customStyles}
        options={jobOptions}
        value={userInformation.job}
        onChange={(e) => handleInputValue(e, "job")}
      />
      <h2 style={{ marginBottom: "2rem" }}>관심 카테고리</h2>
      <Select
        isMulti
        closeMenuOnSelect={false}
        isSearchable={false}
        styles={customMultiStyles}
        options={jobOptions}
        value={userInformation.worryCategories}
        onChange={(e) => handleInputValue(e, "worryCategories")}
      />
    </CollectInformationBox>
  );
};

export default CollectNicknameAgeGender;
