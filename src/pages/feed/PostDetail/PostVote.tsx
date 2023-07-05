import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

import useGetChoiceOptions from '@/apis/hooks/posts/useGetChoiceOptions';
import useUser from '@/apis/hooks/users/useUser';
import CheckIcon from '@/components/icons/CheckIcon';
import ApiConfig, { HttpMethod } from '@/dataManager/apiConfig';
import { EndPoint } from '@/dataManager/apiMapper';
import { justResultWorryHandlerAtom } from '@/states/justResultAtom';
import { Post } from '@/types/post';
import { formatRoundedNumber } from '@/utils/formatRoundedNumber';
import { getRemainingTime } from '@/utils/getRemainingTime';

interface PostVoteProps {
  post: Post;
}

export default function PostVote({ post }: PostVoteProps) {
  const { user } = useUser();
  const { choiceOptions } = useGetChoiceOptions(post.id);

  return (
    <section>
      <div className="mt-[1.2rem] flex flex-col space-y-[1.2rem]">
        {choiceOptions &&
          choiceOptions.slice(0, -1).map((option) => (
            <button
              className="relative flex h-[4.4rem] items-center overflow-hidden rounded-[0.5rem] border border-custom-background-200 text-start shadow-header"
              key={option.id}
            >
              <CheckIcon
                color="#757575"
                className="ml-[0.9rem] mr-[0.7rem] h-[2.4rem] w-[2.4rem]"
              />
              <span className="text-body4 text-custom-gray-600">
                {option.label}
              </span>
              {/* temp image*/}
              <img
                src="https://m.cooksomssi.co.kr/web/product/big/202207/aa3bd6db11d407657ac795fdf9c003b3.jpg"
                alt={option.label || ''}
                className="absolute right-0 aspect-square h-full"
              />
            </button>
          ))}
      </div>
      <div className="mt-[1.5rem] flex justify-between text-body2 text-custom-text-500">
        <button>결과만 볼래요</button>
        <button>현재 투표한 사용자 {0}명</button>
      </div>
    </section>
  );
}
