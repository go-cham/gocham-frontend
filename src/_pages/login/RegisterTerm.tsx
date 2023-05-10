/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import react, { useEffect, useState } from "react";
import { ButtonStyle } from "../../style/common";
import palette from "../../style/color";
import BackButton from "../../images/Common/back_button.png";
import DetailArrow from "../../images/Login/detail_arrow.png";
import CheckBox from "../../_components/login/CheckBox";
import { useNavigate } from "react-router-dom";
import { RouteURL } from "../../App";
import ApiConfig, { HttpMethod } from "../../dataManager/apiConfig";
import { EndPoint } from "../../dataManager/apiMapper";
import { useAtomValue } from "jotai";
import { userAtom } from "../../atom/userData";
import AppBar from "../../_components/common/AppBar";
import BottomContinueBar from "../../_components/common/BottomContinueBar";

export type AcceptType = {
  gochamTerm: boolean;
  personalInformation: boolean;
  olderThan14: boolean;
  marketing: boolean;
  allCheck: boolean;
};
const RegisterTerm = () => {
  const navigate = useNavigate();
  const userInfo = useAtomValue(userAtom);
  const [accept, setAccept] = useState<AcceptType>({
    gochamTerm: false,
    personalInformation: false,
    olderThan14: false,
    marketing: false,
    allCheck: false,
  });

  useEffect(() => {
    if (accept.gochamTerm && accept.personalInformation && accept.olderThan14) {
      setAccept((value) => ({ ...value, allCheck: true }));
    }
  }, [accept.allCheck]);

  const handleRegister = async () => {
    //   회원가입 로직
    const res = await ApiConfig.request({
      method: HttpMethod.PATCH,
      url: EndPoint.user.patch.USER_ACCEPTANCE_OF_TERMS,
      data: {
        userId: userInfo.userId,
        privacyAcceptedStatus: accept.personalInformation ? 1 : 0,
        termsOfUseAcceptedStatus: accept.gochamTerm ? 1 : 0,
        marketingAcceptedStatus: accept.marketing ? 1 : 0,
      },
    });
    console.log(res?.data);
    //   실패 로직
    //   성공 로직
    navigate(RouteURL.collect_information);
  };
  return (
    <>
      <AppBar title={""} boxShadow={false} />
      <RegisterTermWrap>
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
              value={
                accept.gochamTerm &&
                accept.personalInformation &&
                accept.olderThan14 &&
                accept.marketing
              }
              setValue={(value) =>
                setAccept({
                  gochamTerm: value,
                  personalInformation: value,
                  olderThan14: value,
                  marketing: value,
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
          <CheckWrap>
            <CheckBox
              value={accept.marketing}
              setValue={(value) => setAccept({ ...accept, marketing: value })}
            />
            [선택] 마케팅 목적 이용 동의
            <a
              href={
                "https://sharechang.notion.site/c18f70f5ee40492fb8cdb89336014097"
              }
            >
              <img src={DetailArrow} alt={"약관 상세"} className={"화살표"} />
            </a>
          </CheckWrap>
        </section>
      </RegisterTermWrap>
      {accept.gochamTerm && accept.personalInformation && accept.olderThan14 ? (
        <BottomContinueBar
          title={"다음 (1/3)"}
          height={11.2}
          boxShadow={false}
          buttonColor={palette.Primary}
          fontColor={"white"}
          clickAction={() => handleRegister()}
        />
      ) : (
        <BottomContinueBar
          title={"다음 (1/3)"}
          height={11.2}
          boxShadow={false}
          buttonColor={"rgba(42, 45, 55, 0.1)"}
          fontColor={"rgba(42, 45, 55, 0.34)"}
        />
      )}
    </>
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
  width: 90%;
  position: relative;
  height: 90vh;
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
