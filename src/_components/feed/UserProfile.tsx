/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import react, { useEffect, useState } from "react";
import SettingIcon from "../../images/Profile/settings.svg";
import DefaultUserIcon from "../../images/Profile/defaultUserIcon.svg";
import { ButtonStyle } from "../../style/common";
import { userDataAtomType } from "../../atom/userData";
import palette from "../../style/color";
import { useNavigate } from "react-router-dom";
import { RouteURL } from "../../App";

const UserProfile = ({
  isMyFeed,
  userData,
  userProfile,
}: {
  isMyFeed: boolean;
  userData: userDataAtomType;
  userProfile: any;
}) => {
  //   isMyFeed 는 추후 타인 프로필 접근시 프로필 편집 글자 대신 팔로우/팔로우해제 버튼으로
  const navigate = useNavigate();

  const handleGoEditProfile = () => {
    navigate(RouteURL.edit_profile);
  };
  return (
    <>
      <SettingImg
        src={SettingIcon}
        alt={"설정"}
        className={"설정"}
        onClick={() => navigate(RouteURL.settings)}
      />
      <UserProfileWrap>
        <img
          src={DefaultUserIcon}
          alt={"유저이미지"}
          className={"유저이미지"}
        />
        <div className={"유저이름"}>{userData.name}</div>

        <ProfileUtilButton
          width={8.3}
          height={3.1}
          borderRadius={0.7}
          border={`0.1rem solid ${palette.Secondary}`}
          size={1.2}
          onClick={() => handleGoEditProfile()}
        >
          프로필 편집
        </ProfileUtilButton>
      </UserProfileWrap>
    </>
  );
};

export default UserProfile;

const UserProfileWrap = styled.div`
  margin-top: 5.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & .유저이미지 {
    width: 10rem;
    height: 10rem;
    border-radius: 10rem;
  }
  & .유저이름 {
    font-weight: 700;
    font-size: 2.4rem;
    margin-top: 1.3rem;
  }
`;

const SettingImg = styled.img`
  position: absolute;
  right: 2.5rem;
  top: 1.3rem;
`;

const ProfileUtilButton = styled(ButtonStyle)`
  margin-top: 1.3rem;
`;
