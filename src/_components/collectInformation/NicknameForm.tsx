import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import palette from "../../style/color";
import { ErrorMessage } from "./CollectNicknameAgeGender";
import { InputWrap } from "../../_pages/collectInformation/CollectInformation";

interface NicknameFormProps {
  onInputChange: (nickname: string) => void;
}

const NicknameForm: React.FC<NicknameFormProps> = ({ onInputChange }) => {
  const [nickname, setNickname] = useState("");
  const [errorCase, setErrorCase] = useState({
    over10letter: false,
  });
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value.length > 10) {
      setErrorCase((data) => ({ over10letter: true }));
    } else {
      setErrorCase((data) => ({ over10letter: false }));
    }
    setNickname(value);
  };

  useEffect(() => {
    onInputChange(nickname);
  }, [nickname]);

  return (
    <InputWrap>
      <h2>닉네임</h2>
      <NicknameInput
        placeholder={"최대 10자 입력"}
        value={nickname}
        onChange={handleInputChange}
        errorCase={errorCase}
      />
      {errorCase.over10letter && (
        <ErrorMessage>10글자까지만 입력이 가능합니다.</ErrorMessage>
      )}
    </InputWrap>
  );
};

export default NicknameForm;

const NicknameInput = styled.input<{ errorCase: any }>`
  border-bottom-style: solid;
  border-bottom-color: ${({ errorCase }) => {
    if (errorCase.over10letter) {
      return `${palette.Error}`;
    } else {
      return `${palette.Gray1}`;
    }
  }};
  border-bottom-width: 0.2rem;
  :focus {
    border-bottom-width: 0.4rem;
  }
`;