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
import { userInformationType } from "../../_pages/collectInformation/CollectInformation";
import ApiConfig, { HttpMethod } from "../../dataManager/apiConfig";
import { EndPoint } from "../../dataManager/apiMapper";
import { formatISO8601ToNormal } from "../../utils/formatISO8601ToNormal";

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

  const [userInformation, setUserInformation] = useState<userInformationType>({
    nickname: "",
    birthDay: "",
    sex: "",
    residence: { value: 0, label: "" },
    job: { value: 0, label: "" },
    worryCategories: [],
    profileImageUrl: "",
  });

  useEffect(() => {
    //     프로필 조회 api
    ApiConfig.request({
      method: HttpMethod.GET,
      url: EndPoint.user.get.USER,
      path: {
        id: userData.userId,
      },
    })?.then((profileData) => {
      let data = profileData.data;

      // console.log(data);
      const worryCategories = data.userWorryCategories.map((item: any) => ({
        value: item.worryCategory.id,
        label: item.worryCategory.label,
      }));

      const residence = {
        value: data.residence.id,
        label: data.residence.label,
      };

      setUserInformation({
        nickname: data.nickname,
        birthDay: formatISO8601ToNormal(data.birthDate),
        sex: data.sex,
        residence: residence,
        job: { value: data.job.id, label: data.job.label },
        worryCategories: worryCategories,
        profileImageUrl: data.profileImageUrl,
      });
    });
  }, [userData]);

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
          src={
            userInformation.profileImageUrl
              ? userInformation.profileImageUrl
              : DefaultUserIcon
          }
          alt={"유저이미지"}
          className={"유저이미지"}
        />
        <div className={"유저이름"}>{userInformation.nickname}</div>

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
