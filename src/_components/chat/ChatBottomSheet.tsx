import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Content from './BottomSheetContent';
import useBottomSheetFix from '@/hooks/useBottomSheetFix';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/atom/userData';
import { MAX_WIDTH } from '@/constants/viewSize';

// 출처
// https://velog.io/@boris0716/%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EC%84%9C-Bottom-Sheet-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EC%9E%91%EC%84%B1%EC%A4%91

const BackgroundColor = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;

  border-top-left-radius: 1.2rem;
  border-top-right-radius: 1.2rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.6);
`;

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  max-width: ${MAX_WIDTH};
  margin: 0 auto;
  position: fixed;
  z-index: 10;
  //top: 101%;
  top: calc(100% + 1rem); /*시트가 얼마나 높이 위치할지*/
  left: 0;
  right: 0;
  height: 600px;
  //background: white;
  transition: transform 400ms ease-out; /*바텀시트 애니메이션 속도*/

  @media screen and (min-width: 1300px) {
    padding-left: 50rem;
  }
  @media screen and (max-width: 1300px) {
    padding-left: 0;
  }
`;

const BottomSheetContent = styled.div`
  overflow: scroll;
  height: 600px;
  -webkit-overflow-scrolling: touch;
`;

function ChatBottomSheet({
  openBottomSheet,
  handleClickPostChat,
  postId,
  postData,
}: {
  openBottomSheet: boolean;
  handleClickPostChat: () => void;
  postId: number;
  postData: any;
}) {
  const { sheet, header } = useBottomSheetFix({
    openBottomSheet,
    handleClickPostChat,
  });
  const userInfo = useAtomValue(userAtom);

  return (
    <Wrapper ref={sheet}>
      <BackgroundColor>
        <HeaderWrapper
          ref={header}
          onClick={() => {
            handleClickPostChat();
          }}
        >
          <Handle />
        </HeaderWrapper>
        <BottomSheetContent>
          <Content
            openBottomSheet={openBottomSheet}
            postId={postId}
            userInfo={userInfo}
            postData={postData}
          />
        </BottomSheetContent>
      </BackgroundColor>
    </Wrapper>
  );
}

export default ChatBottomSheet;

const HeaderWrapper = styled.div`
  height: 24px;
  border-top-left-radius: 12px;
  border-bottom-right-radius: 12px;
  position: relative;
  padding-top: 12px;
  padding-bottom: 4px;
`;

const Handle = styled.div`
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background-color: #2a2d37;
  margin: auto;
`;
