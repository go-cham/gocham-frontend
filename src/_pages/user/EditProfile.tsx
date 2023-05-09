/** @jsxImportSource @emotion/react */

import react, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import AppBar from "../../_components/common/AppBar";
import BottomContinueBar from "../../_components/common/BottomContinueBar";
import palette from "../../style/color";
import {
  postUserInformationPropsType,
  userInformationType,
} from "../collectInformation/CollectInformation";
import CollectNicknameAgeGender from "../../_components/collectInformation/CollectNicknameAgeGender";
import CollectRegionJobCategory from "../../_components/collectInformation/CollectRegionJobCategory";
import ApiConfig, { HttpMethod } from "../../dataManager/apiConfig";
import { EndPoint } from "../../dataManager/apiMapper";
import getUserInfo from "../../utils/getUserInfo";
import { useAtomValue } from "jotai";
import { userAtom } from "../../atom/userData";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const userInfo = useAtomValue(userAtom);
  const navigate = useNavigate();

  const [userInformation, setUserInformation] = useState<userInformationType>({
    nickname: "",
    birthDay: "",
    sex: "",
    residence: { value: 0, label: "" },
    job: { value: 0, label: "" },
    worryCategories: [],
  });

  useEffect(() => {
    //     프로필 조회 api
    ApiConfig.request({
      method: HttpMethod.GET,
      url: EndPoint.user.get.USER,
      path: {
        id: userInfo.userId,
      },
    })?.then((profileData) => {
      let data = profileData.data;

      console.log(data);
      const worryCategories = data.userWorryCategories.map((item: any) => ({
        id: item.worryCategory.id,
        label: item.worryCategory.label,
      }));

      setUserInformation({
        nickname: data.nickname,
        birthDay: "",
        sex: "",
        residence: { value: 0, label: "" },
        job: { value: data.job.id, label: data.job.label },
        worryCategories: worryCategories,
      });
    });
  }, []);

  const handleClickProfileChange = async () => {
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
          method: HttpMethod.PATCH,
          url: EndPoint.user.patch.USER,
          data: postUserInformation,
        });
        const userInfo = await getUserInfo();
        navigate("/");
      } catch (e) {
        console.error(e);
      }
    }
  };
  return (
    <>
      <AppBar title={"프로필 편집"} boxShadow={false} />
      <EditProfileWrap>
        <CollectNicknameAgeGender
          userInformation={userInformation}
          setUserInformation={setUserInformation}
        />
        <CollectRegionJobCategory
          userInformation={userInformation}
          setUserInformation={setUserInformation}
        />
      </EditProfileWrap>
      <EditConfirmBottomBar
        title={"변경 완료"}
        clickAction={handleClickProfileChange}
        buttonColor={palette.Primary}
        fontColor={"white"}
      />
    </>
  );
};

export default EditProfile;

const EditProfileWrap = styled.div`
  width: 90vw;
  margin-top: 4.6rem;
  height: 90vh;
`;

const EditConfirmBottomBar = styled(BottomContinueBar)`
  font-weight: 700;
`;
