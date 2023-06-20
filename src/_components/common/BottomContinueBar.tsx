/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

import { MAX_WIDTH } from '@/constants/viewSize';
import { ButtonStyle } from '@/style/common';

const BottomContinueBar = ({
  title,
  clickAction,
  fontColor,
  buttonColor,
  boxColor,
  height,
  boxShadow,
}: {
  title: string;
  clickAction?: () => void;
  fontColor?: string;
  buttonColor?: string;
  boxColor?: string;
  height?: number;
  boxShadow?: boolean;
}) => {
  return (
    <BottomBarWrap
      boxColor={boxColor}
      height={height ? height : 11.2}
      boxShadow={boxShadow === undefined ? true : boxShadow}
    >
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

type BottomBarWrapType = {
  height: number | undefined;
  boxColor: string | undefined;
  boxShadow: boolean;
};

const BottomBarWrap = styled.div<BottomBarWrapType>`
  position: fixed;
  margin: 0 auto;
  max-width: ${MAX_WIDTH};
  bottom: -0.5rem;
  box-shadow: ${(props) => {
    if (props.boxShadow === false) {
      return '';
    } else {
      return '0px 0px 2.5rem rgba(42, 45, 55, 0.1)';
    }
  }};
  width: 100%;
  height: ${({ height }) => height + 'rem'};
  background-color: ${({ boxColor }) => (boxColor ? boxColor : 'white')};
`;
