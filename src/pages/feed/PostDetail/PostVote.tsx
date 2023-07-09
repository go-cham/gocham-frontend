import { useAtom } from 'jotai';
import { useState } from 'react';

import useChooseOption from '@/apis/hooks/posts/useChooseOption';
import useGetMyChoice from '@/apis/hooks/posts/useGetMyChoice';
import useGetUsersChoices from '@/apis/hooks/posts/useGetUsersChoices';
import CheckIcon from '@/components/icons/CheckIcon';
import Popup from '@/components/ui/modal/Popup';
import Snackbar from '@/components/ui/modal/Snackbar';
import { twMergeCustom } from '@/libs/tw-merge';
import { selectedVoteOptionIdAtom } from '@/states/selectedVoteOption';

interface PostVoteProps {
  options?: { id: number; label: string }[];
  userId: number;
  postId: number;
  isClosed: boolean;
}

export default function PostVote({
  userId,
  postId,
  options,
  isClosed,
}: PostVoteProps) {
  const { choice } = useGetMyChoice({
    userId,
    postId,
  });
  const { usersChoices } = useGetUsersChoices(postId);
  const [selectedVoteOptionId, setSelectedVoteOptionId] = useAtom(
    selectedVoteOptionIdAtom
  );
  const [onlyReadModalOpen, setOnlyReadModalOpen] = useState(false);
  const { chooseOption } = useChooseOption();
  const optionIds = usersChoices?.map((option) => option.id);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleButtonSelect = (id: number) => {
    if (!optionIds) {
      return null;
    }

    if (!selectedVoteOptionId) {
      setSelectedVoteOptionId(id);
    } else if (id === selectedVoteOptionId) {
      setSelectedVoteOptionId(null);
    } else if (optionIds?.includes(selectedVoteOptionId)) {
      setSelectedVoteOptionId(id);
    } else {
      setOpenSnackbar(true);
      setTimeout(() => {
        setOpenSnackbar(false);
      }, 3000);
    }
  };

  const handleGoBack = () => {
    const button = document.querySelector('#vote-selected');
    if (button) {
      button.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
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

  if (choice || isClosed) {
    const isAbstained = choice?.isAbstained === 'yes';
    const mostVoted = usersChoices
      .filter((option) => !!option.label)
      .sort((a, b) => b.userWorryChoiceCount - a.userWorryChoiceCount)[0].label;
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
                  {choice && !isAbstained && (
                    <CheckIcon
                      color={
                        choice?.label === option.label ? '#222222' : '#e0e0e0'
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
                        choice?.label === option.label
                          ? 'bg-custom-main-500'
                          : 'bg-custom-main-200'
                      }`,
                      choice && isAbstained && 'bg-custom-gray-400',
                      choice &&
                        isAbstained &&
                        mostVoted === option.label &&
                        'bg-custom-gray-800',
                      !choice && isClosed && 'bg-custom-gray-400',
                      !choice &&
                        isClosed &&
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
              selectedVoteOptionId === option.id && 'bg-custom-background-100'
            )}
            key={option.id}
            onClick={() => handleButtonSelect(option.id)}
          >
            <CheckIcon
              color={selectedVoteOptionId === option.id ? '#222222' : '#757575'}
              className="ml-[0.9rem] mr-[0.7rem] h-[2.4rem] w-[2.4rem]"
            />
            <span
              className={`text-body4 ${
                selectedVoteOptionId === option.id
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
      {openSnackbar && (
        <Snackbar
          text="다른 게시물에 동시에 투표할 수 없어요."
          actionText="원위치로 이동"
          className="fixed bottom-[11rem] left-1/2 -translate-x-1/2"
          onClick={handleGoBack}
        />
      )}
    </section>
  );
}
