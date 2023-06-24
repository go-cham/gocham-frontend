import { motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import React from 'react';

import useBottomSheetFix from '@/hooks/useBottomSheetFix';
import { userAtom } from '@/states/userData';

import BottomSheetContent from './BottomSheetContent';

// 출처
// https://velog.io/@boris0716/%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EC%84%9C-Bottom-Sheet-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EC%9E%91%EC%84%B1%EC%A4%91

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
    <motion.div
      className="absolute left-0 top-[calc(100%+1rem)] z-20 flex h-[600px] w-full flex-col rounded-t-[1.2rem] bg-white shadow-[0_0_1rem_rgba(0,0,0,0.6)] duration-[400ms] ease-out"
      ref={sheet}
    >
      <div
        ref={header}
        onClick={handleClickPostChat}
        className="h-[2.4rem] pb-[2.8rem] pt-[1.2rem]"
      >
        <Handle />
      </div>
      <div className="h-[600px] overflow-y-auto">
        <BottomSheetContent
          openBottomSheet={openBottomSheet}
          postId={postId}
          userInfo={userInfo}
          postData={postData}
        />
      </div>
    </motion.div>
  );
}

export default ChatBottomSheet;

function Handle() {
  return (
    <div className="mx-auto h-[0.4rem] w-[4rem] rounded-[2px] bg-[#2a2d37]" />
  );
}
