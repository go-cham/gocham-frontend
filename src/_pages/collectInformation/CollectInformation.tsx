/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import AppBar from "../../_components/common/AppBar";
import palette from "../../style/color";
import CollectNicknameAgeGender from "../../_components/collectInformation/CollectNicknameAgeGender";
import react, { useEffect, useState } from "react";
import BottomContinueBar from "../../_components/common/BottomContinueBar";
import CollectRegionJobCategory from "../../_components/collectInformation/CollectRegionJobCategory";
import { OptionType } from "../../constants/Options";
import ApiConfig, { HttpMethod } from "../../dataManager/apiConfig";
import { EndPoint } from "../../dataManager/apiMapper";
import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { userAtom } from "../../atom/userData";

export type userInformationType = {
  nickname: string;
  birthDay: string;
  sex: string;
  residence: OptionType;
  job: OptionType;
  worryCategories: OptionType[];
};

export type userInformationPropsType = {
  userInformation: userInformationType;
  setUserInformation: react.Dispatch<any>;
};

type postUserInformationPropsType = {
  userId: number;
  nickname: string; // 제거 예정
  birthDate: string;
  sex: string;
  residenceId: number | string; // 추후 number로 변경됨.
  jobId: number | string; // 추후 number로 변경됨.
  worryCategories: number[];
};

const CollectInformation = () => {
  const navigate = useNavigate();
  const userInfo = useAtomValue(userAtom);
  // 로컬스토리지 조회로 사용자의 정보가 이미 입력되어있는지 확인 후 미입력된 경우에만 수집함. => 이는 로그링 리다이렉트 컴포넌트에서 진행

  const [page, setPage] = useState(1);
  const [readyToNext, setReadyToNext] = useState(false);
  const [userInformation, setUserInformation] = useState<userInformationType>({
    nickname: "",
    birthDay: "",
    sex: "",
    residence: { value: 0, label: "" },
    job: { value: 0, label: "" },
    worryCategories: [],
  });

  useEffect(() => {
    if (
      page === 1 &&
      userInformation.nickname &&
      userInformation.sex &&
      userInformation.birthDay &&
      userInformation.birthDay.split("-")[0] < "2006"
    ) {
      setReadyToNext(true);
    } else {
      setReadyToNext(false);
    }
    if (
      page === 2 &&
      userInformation.residence &&
      userInformation.job.value !== 0
    ) {
      setReadyToNext(true);
    }
  }, [userInformation]);

  const uploadCollectData = async () => {
    let postUserInformation: postUserInformationPropsType;
    if (userInfo.userId) {
      postUserInformation = {
        userId: userInfo.userId,
        nickname: userInformation.nickname, // 삭제 예정
        birthDate: userInformation.birthDay.toString(),
        sex: userInformation.sex,
        residenceId: userInformation.residence.value,
        jobId: userInformation.job.value,
        worryCategories: userInformation.worryCategories.map(
          (value) => value.value
        ),
      };
      console.log(postUserInformation);
      try {
        const res = await ApiConfig.request({
          method: HttpMethod.GET,
          url: EndPoint.user.patch.USER_ONCE,
          data: postUserInformation,
        });
        console.log(res);
        navigate("/");
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <>
      <AppBar title={""} boxShadow={false} />
      <CollectInformationWrap>
        <section className={"설명란"}>
          <h1>
            수많은 고민들이👀
            <br />
            당신을 기다리고 있어요!
          </h1>
        </section>
        <section className={"정보입력란"}>
          {page === 1 && (
            <CollectNicknameAgeGender
              userInformation={userInformation}
              setUserInformation={setUserInformation}
            />
          )}
          {page === 2 && (
            <CollectRegionJobCategory
              userInformation={userInformation}
              setUserInformation={setUserInformation}
            />
          )}
        </section>
        {/**/}
        {/* 각 페이지 항목 조건비교해서 색상 및 문구 표시 구현 필요 */}
        {page === 1 && !readyToNext && (
          <BottomContinueBar
            title={"다음 (2/3)"}
            height={11.2}
            boxShadow={false}
            buttonColor={"rgba(42, 45, 55, 0.1)"}
            fontColor={"rgba(42, 45, 55, 0.34)"}
          />
        )}
        {page === 1 && readyToNext && (
          <BottomContinueBar
            title={"다음 (2/3)"}
            height={11.2}
            boxShadow={false}
            buttonColor={palette.Primary}
            fontColor={"white"}
            clickAction={() => {
              setPage(2);
              setReadyToNext(false);
            }}
          />
        )}
        {page === 2 && !readyToNext && (
          <BottomContinueBar
            title={"고참 시작하기 (3/3)"}
            height={11.2}
            boxShadow={false}
            buttonColor={"rgba(42, 45, 55, 0.1)"}
            fontColor={"rgba(42, 45, 55, 0.34)"}
          />
        )}
        {page === 2 && readyToNext && (
          <BottomContinueBar
            title={"고참 시작하기 (3/3)"}
            height={11.2}
            boxShadow={false}
            buttonColor={palette.Primary}
            fontColor={"white"}
            clickAction={() => {
              uploadCollectData();
            }}
          />
        )}
      </CollectInformationWrap>
    </>
  );
};

export default CollectInformation;

const CollectInformationWrap = styled.div`
  width: 90%;
  & .설명란 {
    margin-top: 3.3rem;
    font-weight: 700;
    font-size: 2.7rem;
    letter-spacing: -0.03rem;
    color: ${palette.Secondary};
    line-height: 3.9rem;
  }
  & .정보입력란 {
    height: 70vh;
  }
`;

export const CollectInformationBox = styled.div`
  & h2 {
    margin-top: 2.9rem;
  }
  & input,
  textarea {
    height: 4rem;
    width: 100%;
    font-size: 1.4rem;
    border-bottom: 0.2rem solid ${palette.Gray1};
    transition: border-width 0.1s ease-in-out;
    margin-top: 1.3rem;
    text-align: left;
    color: ${palette.Secondary};
  }
  & input:focus,
  textarea:focus {
    border-bottom: 0.4rem solid ${palette.Gray1};
  }
  input::-webkit-date-and-time-value {
    text-align: left;
  }
`;
