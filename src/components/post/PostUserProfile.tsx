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
    </div>
  );
}
