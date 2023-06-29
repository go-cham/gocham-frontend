import { useState } from 'react';

import useAddComment from '@/apis/hooks/posts/useAddComment';
import useGetComments from '@/apis/hooks/posts/useGetComments';
import SendIcon from '@/images/PostComponent/send.svg';
import { userDataAtomType } from '@/states/userData';
import { PostDataType } from '@/types/post';
import { formatDate } from '@/utils/formatDate';
import { formatText } from '@/utils/formatText';

import PostUserProfile from '../PostUserProfile';

interface BottomSheetContentProps {
  postId: number;
  userInfo: userDataAtomType;
  postData: PostDataType;
}

export default function BottomSheetContent({
  postId,
  userInfo,
  postData,
}: BottomSheetContentProps) {
  const [enteredComment, setEnteredComment] = useState('');
  const { comments } = useGetComments(postId);
  const { addComment } = useAddComment();

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredComment(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!enteredComment || !userInfo.userId) {
      return;
    }

    addComment({
      content: enteredComment,
      userId: userInfo.userId,
      worryId: postId,
    });
    setEnteredComment('');
  };

  return (
    <div className="divide-y-[1px] divide-gray3 pb-[10rem]">
      <div className="px-[1.9rem]">
        <PostUserProfile
          nickname={postData.user.nickname}
          profileImage={postData.user.profileImageUrl}
        />
        <h1 className="mt-[2.1rem] text-[1.8rem] font-bold">
          {postData.title}
        </h1>
        <p className="mt-[1.3rem] text-[1.4rem]">
          {formatText(postData.content)}
        </p>
        <div className="mb-[1.3rem] mt-[1.7rem] text-end">
          <span className="text-[1.2rem] text-text3">
            현재 투표한 사용자 {postData.userWorryChoiceCount}명
          </span>
        </div>
      </div>
      <div className="px-[1.9rem]">
        <form
          className="mt-[1.7rem] flex items-center justify-between"
          onSubmit={handleSubmit}
        >
          <input
            className="h-[4.1rem] w-[88%] rounded-[0.5rem] border border-gray2 px-[1rem] text-[1.4rem] placeholder-text4"
            placeholder={'여러분들의 의견을 자유롭게 남겨주세요!'}
            value={enteredComment}
            onChange={handleCommentChange}
            maxLength={200}
          />
          <button>
            <img src={SendIcon} alt={'전송'} />
          </button>
        </form>
        <div>
          {comments &&
            comments.map((chat) => (
              <div key={chat.id} className="mt-[2.1rem]">
                <div className="flex items-center justify-between">
                  <div className="flex">
                    <PostUserProfile
                      nickname={chat.user.nickname}
                      profileImage={chat.user.profileImageUrl}
                    />
                    {chat.user.worryChoice?.label && (
                      <span className="ml-[0.7rem] flex h-[2.2rem] items-center justify-center rounded-[1.5rem] border px-[1rem] text-[1rem] font-medium">
                        {chat.user.worryChoice.label}
                      </span>
                    )}
                  </div>
                  <div className="text-[1.2rem]">
                    {formatDate(chat.createdAt)}
                  </div>
                </div>
                <p className="mt-[0.9rem] break-all px-[3.3rem] text-[1.4rem]">
                  {chat.content}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
