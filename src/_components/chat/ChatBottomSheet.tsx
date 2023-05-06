import React, { useState } from "react";
import { BOTTOM_SHEET_HEIGHT } from "../../constants/BottomSheetOption";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import useBottomSheet from "../../hooks/useBottomSheet";
import Header from "./BottomSheetHeader";
import Content from "./BottomSheetContent";

// 출처
// https://velog.io/@boris0716/%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EC%84%9C-Bottom-Sheet-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EC%9E%91%EC%84%B1%EC%A4%91

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;

  position: fixed;
  z-index: 1;
  top: 101%;
  //top: calc(100% - 20rem); /*시트가 얼마나 높이 위치할지*/
  left: 0;
  right: 0;

  border-top-left-radius: 1.2rem;
  border-top-right-radius: 1.2rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.6);
  height: ${BOTTOM_SHEET_HEIGHT}px;
  background: white;
  transition: transform 400ms ease-out; /*바텀시트 애니메이션 속도*/
`;

const BottomSheetContent = styled.div`
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

function BottomSheet({
  openBottomSheet,
  handleClickPostChat,
}: {
  openBottomSheet: boolean;
  handleClickPostChat: () => void;
}) {
  const { sheet, content } = useBottomSheet({
    openBottomSheet,
    handleClickPostChat,
  });

  return (
    <Wrapper ref={sheet}>
      <Header />
      <BottomSheetContent ref={content}>
        <Content />
      </BottomSheetContent>
    </Wrapper>
  );
}

export default BottomSheet;
