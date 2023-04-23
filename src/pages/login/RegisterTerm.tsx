/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import react, { useEffect, useState } from "react";
import { ButtonStyle } from "../../style/common";
import palette from "../../style/color";
import BackButton from "../../images/Common/back_button.png";
import DetailArrow from "../../images/Login/detail_arrow.png";
import CheckBox from "../../components/login/CheckBox";
import { useNavigate } from "react-router-dom";
import { RouteURL } from "../../App";

export type AcceptType = {
  gochamTerm: boolean;
  personalInformation: boolean;
  olderThan14: boolean;
  allCheck: boolean;
};
const RegisterTerm = () => {
  const navigate = useNavigate();
  const [accept, setAccept] = useState<AcceptType>({
    gochamTerm: false,
    personalInformation: false,
    olderThan14: false,
    allCheck: false,
  });

  useEffect(() => {
    if (accept.gochamTerm && accept.personalInformation) {
      setAccept((value) => ({ ...value, allCheck: true }));
    }
  }, [accept.allCheck]);

  const handleRegister = () => {
    //   회원가입 로직
    //   실패 로직
    //   성공 로직
    navigate(RouteURL.onboarding);
  };
  return (
    <RegisterTermWrap>
      <img
        src={BackButton}
        alt={"뒤로가기"}
        onClick={() => navigate("/login")}
      />
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
                olderThan14: value,
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
          <a
            href={
              "https://sharechang.notion.site/ac3f06fe803b497681f807f3df65fbe2"
            }
          >
            <img src={DetailArrow} alt={"약관 상세"} className={"화살표"} />
          </a>
        </CheckWrap>
        <CheckWrap>
          <CheckBox
            value={accept.personalInformation}
            setValue={(value) =>
              setAccept({ ...accept, personalInformation: value })
            }
          />
          [필수] 개인정보 수집 및 이용 동의
          <a
            href={
              "https://sharechang.notion.site/c18f70f5ee40492fb8cdb89336014097"
            }
          >
            <img src={DetailArrow} alt={"약관 상세"} className={"화살표"} />
          </a>
        </CheckWrap>
        <CheckWrap>
          <CheckBox
            value={accept.olderThan14}
            setValue={(value) => setAccept({ ...accept, olderThan14: value })}
          />
          [필수] 만 14세 이상 입니다.
        </CheckWrap>
      </section>
      {accept.gochamTerm && accept.personalInformation ? (
        <ConfirmCheckButton
          width={34}
          height={4.7}
          size={1.6}
          backgroundColor={palette.Primary}
          color={palette.Background}
          onClick={() => handleRegister()}
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
  position: relative;
  height: 3.4rem;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;

  & a {
    position: absolute;
    right: 0;
  }
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
