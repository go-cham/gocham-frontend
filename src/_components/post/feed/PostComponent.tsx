import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

import ChatBottomSheet from '@/_components/chat/ChatBottomSheet';
import { refreshChatAtom } from '@/atom/postRefreshRequest';
import { userDataAtomType } from '@/atom/userData';
import ClockIcon from '@/images/PostComponent/clock.svg';
import { postDataType } from '@/type/postDataType';
import { formatText } from '@/utils/formatText';
import { getRemainingTime } from '@/utils/getRemainingTime';
import { handleRefreshPostData } from '@/utils/handleRefreshPostData';

import PostVoteComponent from './PostVoteComponent';

import PostUserProfile from '../PostUserProfile';

const PostComponent = ({
  userInfo,
  postData,
}: {
  userInfo: userDataAtomType;
  postData: postDataType;
}) => {
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [thisPostData, setThisPostData] = useState<postDataType>(postData);
  const [needRefresh, setNeedRefresh] = useAtom(refreshChatAtom);

  const handleClickPostChat = () => {
    setOpenBottomSheet((value) => {
      return !value;
    });
  };

  useEffect(() => {
    setThisPostData(postData);
  }, []);

  // 댓글이나 투표할 경우 해당 컨텐츠만 리프레시.
  useEffect(() => {
    if (needRefresh.worryIdx === postData.id) {
      setThisPostData(
        handleRefreshPostData(thisPostData, needRefresh.updateObject)
      );
      setNeedRefresh({ worryIdx: null, updateObject: '' });
    }
  }, [needRefresh]);

  return (
    <div className="flex flex-col border-b border-gray3 bg-white px-[2.5rem] py-[1.5rem]">
      <PostUserProfile
        nickname={thisPostData.user.nickname}
        profileImage={thisPostData.user.profileImageUrl}
      />
      <h1 className="mt-[2.1rem] text-[1.8rem] font-bold">
        {thisPostData.title}
      </h1>
      <p className="mt-[1.3rem] text-[1.4rem]">
        {formatText(thisPostData.content)}
      </p>
      {thisPostData.worryFiles[0]?.url && (
        <img
          src={thisPostData.worryFiles[0]?.url}
          alt={'게시글이미지'}
          className="mx-auto mt-[1.7rem] max-h-[20.25rem] object-contain"
        />
      )}
      <div className="mt-[1.9rem] flex space-x-2">
        <img src={ClockIcon} alt={'마감시간'} />
        <span className="text-[1.2rem] font-medium text-primary">
          {getRemainingTime(thisPostData.expirationTime)}
        </span>
      </div>
      <PostVoteComponent
        postData={thisPostData}
        userId={userInfo.userId}
        handleClickPostChat={handleClickPostChat}
      />
      <div className="flex justify-between">
        <span
          className="text-[1.2rem] text-text3"
          onClick={handleClickPostChat}
        >
          댓글 {thisPostData.replyCount}개 모두 보기
        </span>
        <span className="text-[1.2rem] text-text3">
          현재 투표한 사용자 {thisPostData.userWorryChoiceCount}명
        </span>
      </div>
      <ChatBottomSheet
        openBottomSheet={openBottomSheet}
        handleClickPostChat={handleClickPostChat}
        postId={thisPostData.id}
        postData={thisPostData}
      />
    </div>
  );
};

export default PostComponent;
