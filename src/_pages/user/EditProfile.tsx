/** @jsxImportSource @emotion/react */

import react from "react";
import styled from "@emotion/styled";
import AppBar from "../../_components/common/AppBar";
import BottomContinueBar from "../../_components/common/BottomContinueBar";
import palette from "../../style/color";

const EditProfile = () => {
  const handleClickProfileChange = () => {
    console.log("gg");
  };
  return (
    <>
      <AppBar title={"프로필 편집"} boxShadow={false} />
      <div>
        <div>
          <div>프로필 이미지</div>
          <div>프로필 사진 변경</div>
        </div>
      </div>
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

const EditConfirmBottomBar = styled(BottomContinueBar)`
  font-weight: 700;
`;
