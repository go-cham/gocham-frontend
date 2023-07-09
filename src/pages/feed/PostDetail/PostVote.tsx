import { useAtom } from 'jotai';
import { useState } from 'react';

import useChooseOption from '@/apis/hooks/posts/useChooseOption';
import useGetMyChoice from '@/apis/hooks/posts/useGetMyChoice';
import useGetUsersChoices from '@/apis/hooks/posts/useGetUsersChoices';
import CheckIcon from '@/components/icons/CheckIcon';
import Popup from '@/components/ui/modal/Popup';
import { twMergeCustom } from '@/libs/tw-merge';
import { selectedVoteOptionAtom } from '@/states/selectedVoteOption';

interface PostVoteProps {
  options?: { id: number; label: string }[];
  userId: number;
  postId: number;
}

export default function PostVote({ userId, postId, options }: PostVoteProps) {
  const { choice } = useGetMyChoice({
    userId,
    postId,
  });
  const { usersChoices } = useGetUsersChoices(postId);
  const [selectedVoteOption, setSelectedVoteOption] = useAtom(
    selectedVoteOptionAtom
  );
  const [onlyReadModalOpen, setOnlyReadModalOpen] = useState(false);
  const { chooseOption } = useChooseOption();

  const handleButtonSelect = (id: number) => {
    if (id === selectedVoteOption?.id) {
      setSelectedVoteOption(null);
    } else {
      setSelectedVoteOption({
        id,
        inView: true,
      });
    }
  };

  if (!options || !usersChoices) {
    return null;
  }

  const handleAbstention = () => {
    const choiceId = usersChoices.find(
      (option) => option.isAbstained === 'yes'
    )?.id;
    if (!choiceId) {
      return;
    }
    chooseOption({ userId, worryChoiceId: choiceId });
    setOnlyReadModalOpen(false);
  };

  const total = usersChoices
    .filter((option) => !!option.label)
    .reduce((acc, cur) => acc + cur.userWorryChoiceCount, 0);

  if (choice) {
    const isAbstained = choice.isAbstained === 'yes';
    const mostVoted = usersChoices
      .filter((option) => !!option.label)
      .sort((a, b) => b.userWorryChoiceCount - a.userWorryChoiceCount)[0].label;
    console.log(mostVoted);
    return (
      <section className="mt-[1.1rem] px-[2.5rem]">
        <div className="space-y-[2.1rem] rounded-[0.5rem] border px-[1.7rem] py-[1.5rem]">
          {options.map((option) => {
            const count =
              usersChoices.find((o) => o.label === option.label)
                ?.userWorryChoiceCount || 0;
            const percentage = total === 0 ? 0 : (count / total) * 100;

            return (
              <div key={option.id}>
                <div key={option.id} className="relative flex">
                  {!isAbstained && (
                    <CheckIcon
                      color={
                        choice.label === option.label ? '#222222' : '#e0e0e0'
                      }
                    />
                  )}
                  <div className="ml-[0.6rem] flex flex-col">
                    <span className="text-body4">{option.label}</span>
                    <span className="text-body1 text-custom-text-500">
                      {percentage}% ({count}명)
                    </span>
                  </div>
                  <img
                    src="https://m.cooksomssi.co.kr/web/product/big/202207/aa3bd6db11d407657ac795fdf9c003b3.jpg"
                    alt={option.label || ''}
                    className="absolute right-0 aspect-square h-full"
                  />
                </div>
                <div className="relative mt-[0.4rem] h-[4px] w-full rounded-[5px] bg-custom-background-100">
                  <div
                    className={twMergeCustom(
                      `absolute left-0 top-0 h-full rounded-[5px] ${
                        choice.label === option.label
                          ? 'bg-custom-main-500'
                          : 'bg-custom-main-200'
                      }`,
                      isAbstained && 'bg-custom-gray-400',
                      isAbstained &&
                        mostVoted === option.label &&
                        'bg-custom-gray-800'
                    )}
                    style={{
                      width: percentage + '%',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section className="px-[2.5rem]">
      <div className="mt-[1.2rem] flex flex-col space-y-[1.2rem]">
        {options.map((option) => (
          <button
            className={twMergeCustom(
              'relative flex h-[4.4rem] items-center overflow-hidden rounded-[0.5rem] border border-custom-background-200 text-start shadow-header',
              selectedVoteOption?.id === option.id && 'bg-custom-background-100'
            )}
            key={option.id}
            onClick={() => handleButtonSelect(option.id)}
          >
            <CheckIcon
              color={
                selectedVoteOption?.id === option.id ? '#222222' : '#757575'
              }
              className="ml-[0.9rem] mr-[0.7rem] h-[2.4rem] w-[2.4rem]"
            />
            <span
              className={`text-body4 ${
                selectedVoteOption?.id === option.id
                  ? 'text-gray-900'
                  : 'text-custom-gray-600'
              }`}
            >
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
        <button onClick={() => setOnlyReadModalOpen(true)}>
          결과만 볼래요
        </button>
        <button>현재 투표한 사용자 {total}명</button>
      </div>
      <Popup
        isOpen={onlyReadModalOpen}
        text={'결과를 열람하시면\n투표에 참여하실 수 없습니다.'}
        buttonLabel="그래도 볼게요"
        onCancel={() => setOnlyReadModalOpen(false)}
        onClickButton={handleAbstention}
      />
    </section>
  );
}
