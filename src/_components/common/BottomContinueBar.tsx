/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import palette from "../../style/color";
import { ButtonStyle } from "../../style/common";
import styled from "@emotion/styled";

const BottomContinueBar = ({
  title,
  clickAction,
  fontColor,
  buttonColor,
  boxColor,
}: {
  title: string;
  clickAction?: () => void;
  fontColor?: string;
  buttonColor?: string;
  boxColor?: string;
}) => {
  return (
    <BottomBarWrap boxColor={boxColor}>
      <NextButton
        width={34}
        height={4.7}
        backgroundColor={buttonColor}
        borderRadius={0.5}
        color={fontColor}
        size={1.6}
        fontWeight={700}
        onClick={clickAction}
      >
        {title}
      </NextButton>
    </BottomBarWrap>
  );
};

export default BottomContinueBar;

const NextButton = styled(ButtonStyle)`
  margin: 1.7rem auto;
`;

const BottomBarWrap = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  box-shadow: 0px 0px 2.5rem rgba(42, 45, 55, 0.1);
  width: 100vw;
  height: 11.2rem;
  background-color: ${({ boxColor }: { boxColor: string | undefined }) =>
    boxColor};
`;
