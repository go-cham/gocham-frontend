/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RouteURL } from '@/App';
import palette from '@/style/color';
import { ButtonStyle } from '@/style/common';

const Onboarding = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const handleOnboardingPage = () => {
    if (page === 1) setPage(2);
    if (page === 2) setPage(3);
    if (page === 3) navigate(RouteURL.home);
  };

  return (
    <>
      {/* 컴포넌트 구분선 */}
      <SkipText onClick={() => navigate(RouteURL.home)}>건너뛰기</SkipText>
      {/* 하단바 구분선 */}
      <BottomBarWrap>
        <NextButton
          width={34}
          height={4.7}
          backgroundColor={palette.Primary}
          borderRadius={0.5}
          color={palette.Background}
          size={1.6}
          fontWeight={700}
          onClick={handleOnboardingPage}
        >
          {page === 1 ? '다음(1/3)' : null}
          {page === 2 ? '다음(2/3)' : null}
          {page === 3 ? '홈으로 이동' : null}
        </NextButton>
      </BottomBarWrap>
    </>
  );
};
export default Onboarding;

const SkipText = styled.div`
  position: absolute;
  right: 2.5rem;
  top: 1.4rem;
  font-weight: 500;
  font-size: 1.6rem;
  color: ${palette.Gray2};
`;

const NextButton = styled(ButtonStyle)`
  margin-top: 1.7rem;
`;

const BottomBarWrap = styled.div`
  width: 100vw;
  height: 11.2rem;
  background-color: #3f424b;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
`;
