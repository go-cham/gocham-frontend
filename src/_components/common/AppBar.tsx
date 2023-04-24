/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import BackButton from "../../images/Common/back_button_42X42.svg";
import palette from "../../style/color";
import { useNavigate } from "react-router-dom";

const AppBar = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  return (
    <AppBarBox>
      <img
        src={BackButton}
        alt={"뒤로가기"}
        className={"뒤로가기"}
        onClick={() => navigate(-1)}
      />
      <h1>{title}</h1>
    </AppBarBox>
  );
};

export default AppBar;

const AppBarBox = styled.div`
  //position: absolute;
  //left: 0;
  display: flex;
  width: 100%;
  height: 4.5rem;
  align-items: center;
  box-shadow: 0px 0px 2.5rem rgba(42, 45, 55, 0.1);
  background-color: ${palette.Background};
  & > .뒤로가기 {
    position: absolute;
  }
  & > h1 {
    margin: 0 auto;
    font-weight: 700;
    font-size: 1.6rem;
  }
`;
