/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import GrayProfileImg from "../../images/PostComponent/gray_profileImg.png";
import MenuIcon from "../../images/PostComponent/menu.svg";
import React from "react";
import styled from "@emotion/styled";

const PostProfileBox = ({
  nickname,
  profileImg,
  menuFunction,
}: {
  nickname: string;
  profileImg?: string | null;
  menuFunction?: () => void;
}) => {
  return (
    <ProfileBox>
      <div>
        <img src={profileImg ? profileImg : GrayProfileImg} alt={"프로필"} />
        <div className={"nickname"}>{nickname}</div>
      </div>
      {menuFunction && (
        <img
          src={MenuIcon}
          alt={"메뉴"}
          onClick={menuFunction}
          className={"menu"}
        />
      )}
    </ProfileBox>
  );
};

export default PostProfileBox;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 1.25rem;
  }
  & > div {
    display: flex;
    align-items: center;
  }
  & .nickname {
    font-weight: 500;
    margin-left: 0.5rem;
    font-size: 1.2rem;
  }
  & .menu {
    right: 0;
  }
`;
