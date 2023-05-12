/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import palette from "../../style/color";
import {
  CollectInformationBox,
  userInformationPropsType,
  userInformationType,
} from "../../_pages/collectInformation/CollectInformation";
import React from "react";
import { ButtonStyle } from "../../style/common";

const CollectNicknameAgeGender = ({
  userInformation,
  setUserInformation,
}: userInformationPropsType) => {
  const handleInputValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setUserInformation((value: userInformationType) => ({
      ...value,
      [key]: e.target.value,
    }));
  };

  const handleSelectGender = (sex: string) => {
    setUserInformation((value: userInformationType) => ({
      ...value,
      sex,
    }));
  };
  return (
    <CollectInformationBox>
      <h2>닉네임</h2>
      <input
        placeholder={"최대 10자 입력"}
        value={userInformation.nickname}
        onChange={(e) => handleInputValue(e, "nickname")}
      />
      <h2>생년월일</h2>
      <input
        type={"date"}
        value={userInformation.birthDay}
        onChange={(e) => handleInputValue(e, "birthDay")}
        max={"2005-01-01"}
        min={"1900-01-01"}
      />
      <h2>성별</h2>
      <SelectGenderWrap>
        <SelectGenderBox
          height={3.9}
          width={"48%"}
          borderRadius={0.5}
          size={1.4}
          color={
            userInformation.sex === "male" ? "white" : "rgba(42, 45, 55, 0.5)"
          }
          onClick={() => handleSelectGender("male")}
          backgroundColor={
            userInformation.sex === "male" ? palette.Secondary : "rgba(0,0,0,0)"
          }
        >
          남자
        </SelectGenderBox>
        <SelectGenderBox
          height={3.9}
          width={"48%"}
          borderRadius={0.5}
          size={1.4}
          color={
            userInformation.sex === "female" ? "white" : "rgba(42, 45, 55, 0.5)"
          }
          onClick={() => handleSelectGender("female")}
          backgroundColor={
            userInformation.sex === "female"
              ? palette.Secondary
              : "rgba(0,0,0,0)"
          }
        >
          여자
        </SelectGenderBox>
      </SelectGenderWrap>
    </CollectInformationBox>
  );
};

export default CollectNicknameAgeGender;

const SelectGenderBox = styled(ButtonStyle)`
  border: 0.1rem solid ${palette.Gray2};
  border-radius: 0.5rem;
  font-weight: 500;
`;

const SelectGenderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.3rem;
`;
