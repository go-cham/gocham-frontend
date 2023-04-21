/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import react, { useEffect, useState } from "react";
import { ButtonStyle } from "../../style/common";
import palette from "../../style/color";
import BackButton from "../../images/Common/back_button.png";
import CheckBox from "../../components/login/CheckBox";

export type AcceptType = {
  gochamTerm: boolean;
  personalInformation: boolean;
  allCheck: boolean;
};
const RegisterTerm = () => {
  const [accept, setAccept] = useState<AcceptType>({
    gochamTerm: false,
    personalInformation: false,
    allCheck: false,
  });

  useEffect(() => {
    if (accept.gochamTerm && accept.personalInformation) {
      setAccept((value) => ({ ...value, allCheck: true }));
    }
  }, [accept.allCheck]);

  return (
    <RegisterTermWrap>
      <img src={BackButton} alt={"뒤로가기"} />
      <div className={"약관문구"}>
        환영합니다!
        <br />
        서비스 이용약관에
        <br />
        동의해주세요.
      </div>
      <section className={"약관체크"}>
        <CheckWrap>
          <CheckBox
            value={accept.gochamTerm && accept.personalInformation}
            setValue={(value) =>
              setAccept({
                gochamTerm: value,
                personalInformation: value,
                allCheck: value,
              })
            }
          />
          모두 동의합니다.
        </CheckWrap>
        <hr />
        <CheckWrap>
          <CheckBox
            value={accept.gochamTerm}
            setValue={(value) => setAccept({ ...accept, gochamTerm: value })}
          />
          [필수] 고민의 참견 이용약관 동의
        </CheckWrap>
        <CheckWrap>
          <CheckBox
            value={accept.personalInformation}
            setValue={(value) =>
              setAccept({ ...accept, personalInformation: value })
            }
          />
          [필수] 개인정보 수집 및 이용 동의
        </CheckWrap>
      </section>
      {accept.gochamTerm && accept.personalInformation ? (
        <ConfirmCheckButton
          width={34}
          height={4.7}
          size={1.6}
          backgroundColor={palette.Primary}
          color={palette.Background}
        >
          회원가입 완료
        </ConfirmCheckButton>
      ) : (
        <ConfirmCheckButton
          width={34}
          height={4.7}
          size={1.6}
          backgroundColor={"rgba(42, 45, 55, 0.1)"}
          color={"rgba(42, 45, 55, 0.34)"}
        >
          회원가입 완료
        </ConfirmCheckButton>
      )}
    </RegisterTermWrap>
  );
};

export default RegisterTerm;

const CheckWrap = styled.div`
  height: 3.4rem;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
`;

const RegisterTermWrap = styled.div`
  width: 80vw;
  margin-top: 2.4rem;
  & > .약관문구 {
    margin-top: 3.9rem;
    margin-bottom: 3rem;
    font-weight: 700;
    font-size: 2.7rem;
    line-height: 3.9rem;
  }
`;
const ConfirmCheckButton = styled(ButtonStyle)`
  position: absolute;
  bottom: 4.8rem;
  border-radius: 0.5rem;
  font-weight: 700;
  font-size: 1.6rem;
`;
