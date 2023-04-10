/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import backgroundImage from "../../images/GNB/GNB_bar_icon.png";

const GNB = () => {
  return <GNBBackground image={backgroundImage}>GNB</GNBBackground>;
};

export default GNB;

const GNBBackground = styled.div<{ image: string }>`
  background-image: url(${(props) => props.image});
  width: 100vw;
  padding-bottom: ${(1 / (52 / 9)) *
  100}%; /* 이미지의 가로세로 비율에 맞춰서 padding-bottom 값을 계산합니다. 예를 들어, 16:9 비율의 이미지는 9/16 * 100% = 56.25%가 됩니다. */
  filter: drop-shadow(0px 0px 25px rgba(42, 45, 55, 0.1));
  background-repeat: no-repeat;
  background-size: contain; /* contain으로 설정합니다. */
  background-position: center;
  position: absolute;
  bottom: 0;
`;
