/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import BackButton from '@/images/Common/back_button_42X42.svg';
import palette from '@/style/color';

const AppBar = ({
  title,
  boxShadow,
  background,
  navigateRoute,
  navigateAction,
}: {
  title: string;
  boxShadow?: boolean;
  background?: string;
  navigateRoute?: string;
  navigateAction?: () => void;
}) => {
  const navigate = useNavigate();

  const handleClickBackButton = () => {
    if (navigateAction) {
      // navigateAction 이 있을경우
      navigateAction();
    } else {
      // navigateAction 이 없을 경우
      if (navigateRoute) {
        navigate(navigateRoute);
      } else {
        navigate(-1);
      }
    }
  };
  return (
    <AppBarBox
      boxShadow={boxShadow === undefined ? true : boxShadow}
      background={background ? background : null}
    >
      <img
        src={BackButton}
        alt={'뒤로가기'}
        className={'뒤로가기'}
        onClick={() => handleClickBackButton()}
      />
      <h1>{title}</h1>
    </AppBarBox>
  );
};

export default AppBar;

const AppBarBox = styled.div<{ boxShadow: boolean; background: string | null }>`
  //position: absolute;
  //left: 0;
  display: flex;
  position: relative;
  width: 100%;
  height: 4.5rem;
  align-items: center;
  box-shadow: ${(props) => {
    if (props.boxShadow === false) {
      return '';
    } else {
      return '0px 0px 2.5rem rgba(42, 45, 55, 0.1)';
    }
  }};
  background-color: ${(props) => {
    if (props.background) {
      return props.background;
    } else {
      return `${palette.Background}`;
    }
  }};
  & > .뒤로가기 {
    position: absolute;
  }
  & > h1 {
    margin: 0 auto;
    font-weight: 700;
    font-size: 1.6rem;
  }
  border-bottom: 1px solid #eaeaeb;
`;
