import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ChatBottomSheet from '@/components/post/ChatBottomSheet';
import PostUserProfile from '@/components/post/PostUserProfile';
import { RouteURL } from '@/constants/route-url';
import { userType } from '@/constants/userTypeEnum';
import { refreshChatAtom } from '@/states/postRefreshRequest';
import { userDataAtomType } from '@/states/userData';
import { PostDataType } from '@/types/post';
import { formatText } from '@/utils/formatText';
import { handleRefreshPostData } from '@/utils/handleRefreshPostData';

const PostCard = ({
  userInfo,
  postData,
  routeUrl,
}: {
  userInfo: userDataAtomType;
  postData: any;
  routeUrl?: string;
}) => {
  const navigate = useNavigate();
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const handleGoPostDetail = () => {
    if (routeUrl) {
      navigate(`${RouteURL.feed}/${thisPostData.id}/${routeUrl}`);
    } else {
      navigate(`${RouteURL.feed}/${thisPostData.id}`);
    }
  };
  const handleClickPostChat = () => {
    if (userInfo.userType === userType.activatedUser) {
      setOpenBottomSheet((value) => {
        // console.log(value, "->", !value);
        return !value;
      });
    } else {
      navigate(RouteURL.auth_check);
    }
  };
  const [thisPostData, setThisPostData] = useState<PostDataType>(postData);
  useEffect(() => {
    setThisPostData(postData);
  }, []);

  const [needRefresh, setNeedRefresh] = useAtom(refreshChatAtom);
  // 댓글이나 투표할 경우 해당 컨텐츠만 리프레시.
  useEffect(() => {
    if (needRefresh.worryIdx === postData.id) {
      // console.log("needRefresh 작동중");
      setThisPostData(
        handleRefreshPostData(thisPostData, needRefresh.updateObject)
      );
      setNeedRefresh({ worryIdx: null, updateObject: '' });
    }
  }, [needRefresh]);

  return (
    <>
      <section className="flex h-[16.5rem] w-[34rem] flex-col justify-between rounded-[1.2rem] bg-white px-[1.7rem] py-[1.4rem] shadow-[0_0_0.4rem_rgba(42,45,55,0.1)]">
        <div>
          <PostUserProfile
            nickname={thisPostData.user.nickname}
            profileImage={thisPostData.user.profileImageUrl}
          />
          <PostCardContent
            title={thisPostData.title}
            content={thisPostData.content}
            image={thisPostData.worryFiles[0]?.url || null}
            onClick={handleGoPostDetail}
          />
        </div>
        <PostCardMeta
          numComment={thisPostData.replyCount}
          numVotes={thisPostData.userWorryChoiceCount}
          onClickComment={handleClickPostChat}
        />
      </section>
      <ChatBottomSheet
        openBottomSheet={openBottomSheet}
        handleClickPostChat={handleClickPostChat}
        postId={thisPostData.id}
        postData={thisPostData}
      />
    </>
  );
};

export default PostCard;

function PostCardContent({
  title,
  content,
  image,
  onClick,
}: {
  title: string;
  content: string;
  image: string | null;
  onClick: () => void;
}) {
  return (
    <div className="mt-[1.5rem] flex" onClick={onClick}>
      <div className="flex-1 space-y-[0.5rem]">
        <h1 className="line-clamp-1 text-[1.6rem] font-bold text-text1">
          {title}
        </h1>
        <p className="line-clamp-1 h-[1.6rem] text-[1.2rem] text-text2">
          {formatText(content)}
        </p>
      </div>
      {image && (
        <img
          src={image}
          alt={'게시글 이미지'}
          className="h-[7.2rem] w-[7.2rem] object-cover"
        />
      )}
    </div>
  );
}

function PostCardMeta({
  numComment,
  numVotes,
  onClickComment,
}: {
  numComment: number;
  numVotes: number;
  onClickComment: () => void;
}) {
  return (
    <div className="flex items-end justify-between">
      <span
        className="text-[1.2rem] font-medium text-text2"
        onClick={onClickComment}
      >
        댓글 {numComment}개 모두 보기
      </span>
      <span className="text-[1rem] font-medium text-text3">
        현재 투표한 사용자 {numVotes}명
      </span>
    </div>
  );
}
