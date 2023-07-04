import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

import ChatBottomSheet from '@/components/post/ChatBottomSheet';
import PostUserProfile from '@/components/post/PostUserProfile';
import ClockIcon from '@/images/PostComponent/clock.svg';
import { refreshChatAtom } from '@/states/postRefreshRequest';
import { userDataAtomType } from '@/states/userData';
import { Post } from '@/types/post';
import { formatText } from '@/utils/formatText';
import { getRemainingTime } from '@/utils/getRemainingTime';
import { handleRefreshPostData } from '@/utils/handleRefreshPostData';

import PostVote from './PostVote';

interface PostDetailProps {
  userInfo: userDataAtomType;
  postData: Post;
}

export default function PostDetail({ userInfo, postData }: PostDetailProps) {
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [thisPostData, setThisPostData] = useState<Post>(postData);
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
        age={20} // TODO
        color="gray"
      />
      <PostDetailContent
        title={thisPostData.title}
        content={thisPostData.content}
        image={thisPostData.worryFiles[0]?.url}
      />
      <PostExpiration expirationTime={thisPostData.expirationTime} />
      <PostVote
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
}

function PostDetailContent({
  title,
  content,
  image,
}: {
  title: string;
  content: string;
  image?: string | null;
}) {
  return (
    <div>
      <h1 className="mt-[2.1rem] text-[1.8rem] font-bold">{title}</h1>
      <p className="mt-[1.3rem] break-words text-[1.4rem]">
        {formatText(content)}
      </p>
      {image && (
        <img
          src={image}
          alt={'게시글이미지'}
          className="mx-auto mt-[1.7rem] max-h-[20.25rem] object-contain"
        />
      )}
    </div>
  );
}

function PostExpiration({ expirationTime }: { expirationTime: string | null }) {
  return (
    <div className="mt-[1.9rem] flex space-x-2">
      <img src={ClockIcon} alt={'마감시간'} />
      <span className="text-[1.2rem] font-medium text-primary">
        {getRemainingTime(expirationTime)}
      </span>
    </div>
  );
}
