/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import GrayProfileImg from "../../images/PostComponent/gray_profileImg.png";
import React from "react";
import styled from "@emotion/styled";

const PostProfileBox = ({
  nickname,
  profileImg,
}: {
  nickname: string;
  profileImg?: string | null;
}) => {
  return (
    <ProfileBox>
      <img
        src={profileImg !== null ? profileImg : GrayProfileImg}
        alt={"프로필 이미지"}
      />
      <div>{nickname}</div>
    </ProfileBox>
  );
};

export default PostProfileBox;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  & > img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 1.25rem;
  }
  & > div {
    font-weight: 500;
    margin-left: 0.5rem;
    font-size: 1.2rem;
  }
`;
