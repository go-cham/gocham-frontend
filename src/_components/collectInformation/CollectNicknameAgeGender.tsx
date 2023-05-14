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
import BirthdateForm from "./BirthDateForm";
import NicknameForm from "./NicknameForm";

const CollectNicknameAgeGender = ({
  userInformation,
  setUserInformation,
}: userInformationPropsType) => {
  const handleSelectGender = (sex: string) => {
    setUserInformation((value: userInformationType) => ({
      ...value,
      sex,
    }));
  };

  //생년월일 관련
  const handleBirthDateInputChange = (
    year: string,
    month: string,
    day: string
  ) => {
    // 입력값을 이용한 로직 처리
    const monthValue = month.length === 1 ? "0" + month : month;
    const dayValue = day.length === 1 ? "0" + day : day;

    setUserInformation((value: userInformationType) => ({
      ...value,
      birthDay: `${year}-${monthValue}-${dayValue}`,
    }));
  };

  const handleNicknameInputChange = (nickname: string) => {
    setUserInformation((value: userInformationType) => ({
      ...value,
      nickname: nickname,
    }));
  };

  return (
    <CollectInformationBox>
      <NicknameForm
        onInputChange={handleNicknameInputChange}
        userInformation={userInformation}
      />

      <BirthdateForm
        onInputChange={handleBirthDateInputChange}
        userInformation={userInformation}
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
export const ErrorMessage = styled.div`
  margin-top: 1rem;
  text-align: right;
  font-size: 1.2rem;
  color: ${palette.Error};
  font-weight: 400;
`;

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
