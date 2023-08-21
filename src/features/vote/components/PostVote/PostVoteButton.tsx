import { useAtom } from 'jotai';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import CheckIcon from '@/common/components/icons/CheckIcon';
import { Snackbar } from '@/common/components/ui/modal';
import { useGetUsersChoices } from '@/features/vote/queries';
import { selectedVoteOptionIdAtom } from '@/features/vote/states/selected-vote-option';
import { customColors } from '@/styles/colors';

interface PostVoteButtonProps {
  postId: number;
  option: { id: number; label: string; image: string | null };
  onClickImage: (image: string | null) => void;
}

export function PostVoteButton({
  postId,
  option,
  onClickImage,
}: PostVoteButtonProps) {
  const { data: usersChoices } = useGetUsersChoices(postId);
  const [selectedVoteOptionId, setSelectedVoteOptionId] = useAtom(
    selectedVoteOptionIdAtom,
  );
  const optionIds = usersChoices?.map((option) => option.id);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleGoBack = () => {
    const button = document.querySelector('#vote-selected');
    if (button) {
      button.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
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

  return (
    <>
      <button
        className={twMerge(
          'relative flex h-[4.4rem] items-center overflow-hidden rounded-[0.5rem] border border-background-dividerLine-300 text-start shadow-header',
          selectedVoteOptionId === option.id && 'bg-background-voteBg-100',
        )}
        key={option.id}
        onClick={() => handleButtonSelect(option.id)}
      >
        <CheckIcon
          color={
            selectedVoteOptionId === option.id
              ? customColors.text.title['900']
              : '#757575'
          }
          className="ml-[0.9rem] mr-[0.7rem] h-[2.4rem] w-[2.4rem]"
        />
        <span
          className={`font-system-body4 ${
            selectedVoteOptionId !== option.id && 'text-[#757575]'
          }`}
        >
          {option.label}
        </span>
        {option.image && (
          <img
            src={option.image}
            alt={option.label}
            className="absolute right-0 aspect-square h-full object-cover"
            onClick={(e) => {
              onClickImage(option.image);
              e.stopPropagation();
            }}
          />
        )}
      </button>
      {openSnackbar && (
        <Snackbar
          text="다른 게시물에 동시에 투표할 수 없어요."
          actionText="원위치로 이동"
          className="fixed bottom-[11rem] left-1/2 -translate-x-1/2"
          onClick={handleGoBack}
        />
      )}
    </>
  );
}
