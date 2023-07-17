import { useParams } from 'react-router-dom';

import useGetComments from '@/apis/hooks/posts/useGetComments';

interface PostUserProfileProps {
  nickname: string;
  age: number;
  color?: 'primary' | 'gray';
  comment?: boolean;
  isWriter?: boolean;
  voteContent?: string | null;
}

export default function PostUserProfile({
  nickname,
  age,
  color = 'primary',
  comment = false,
  isWriter = false,
  voteContent = null,
}: PostUserProfileProps) {
  return (
    <div className="flex items-center space-x-[0.5rem]">
      <span
        className={`flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full text-[1.2rem] font-bold tracking-[-0.36px] ${
          color === 'primary'
            ? 'bg-custom-main-100 text-custom-main-500'
            : 'bg-[#f4f4f5] text-[#b0b2b8]'
        }`}
      >
        {String(age)[0] + '0'}
      </span>
      <span className="text-body2 text-gray-900">{nickname}</span>
      {comment && (
        <>
          <div className="h-[0.3rem] w-[0.3rem] rounded-full bg-[#CCCFD4]"></div>
          <div className="text-body1 text-gray-800">
            {voteContent ? voteContent : isWriter ? null : '투표 항목 없음'}
          </div>
        </>
      )}
      {isWriter && (
        <>
          <div className="rounded-3xl border border-[#676A72] px-[0.7rem] py-[0.5rem] text-[1rem] font-medium text-[#676A72]">
            작성자
          </div>
        </>
      )}
    </div>
  );
}
