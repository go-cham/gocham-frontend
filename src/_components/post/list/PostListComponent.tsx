import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RouteURL } from '@/App';
import ChatBottomSheet from '@/_components/chat/ChatBottomSheet';
import { refreshChatAtom } from '@/atom/postRefreshRequest';
import { userDataAtomType } from '@/atom/userData';
import { userType } from '@/constants/userTypeEnum';
import GrayProfileImg from '@/images/PostComponent/gray_profileImg.png';
import { postDataType } from '@/type/postDataType';
import { formatText } from '@/utils/formatText';
import { handleRefreshPostData } from '@/utils/handleRefreshPostData';

const PostListComponent = ({
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
  const [thisPostData, setThisPostData] = useState<postDataType>(postData);
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
      <section className="flex h-[16.5rem] w-[34rem] flex-col justify-between rounded-[1.2rem] bg-white p-[1.7rem] shadow-[0_0_0.4rem_rgba(42,45,55,0.1)]">
        <div>
          <div className="flex items-center space-x-2">
            <img
              src={thisPostData.user?.profileImageUrl || GrayProfileImg}
              alt="프로필"
              className="h-[2.5rem] w-[2.5rem] rounded-full"
            />
            <span className="text-[1.2rem]">
              {thisPostData.user.nickname || '익명'}
            </span>
          </div>
          <div className="mt-[1.5rem] flex" onClick={handleGoPostDetail}>
            <div className="flex-1 space-y-[0.5rem]">
              <h1 className="line-clamp-1 text-[1.6rem] font-bold text-text1">
                {thisPostData.title}
              </h1>
              <p className="line-clamp-1 h-[1.6rem] text-[1.2rem] text-text2">
                {formatText(thisPostData.content)}
              </p>
            </div>
            {thisPostData.worryFiles[0]?.url && (
              <img
                src={thisPostData.worryFiles[0]?.url}
                alt={'게시글 이미지'}
                className="h-[7.2rem] w-[7.2rem] object-cover"
              />
            )}
          </div>
        </div>
        <div className="flex items-end justify-between">
          <span
            className="text-[1.2rem] font-medium text-text2"
            onClick={() => handleClickPostChat()}
          >
            댓글 {thisPostData.replyCount}개 모두 보기
          </span>
          <span className="text-[1rem] font-medium text-text3">
            현재 투표한 사용자 {thisPostData.userWorryChoiceCount}명
          </span>
        </div>
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

export default PostListComponent;
