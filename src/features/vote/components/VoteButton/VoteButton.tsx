import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { FloatingButton } from '@/common/components/ui/buttons';
import { useUser } from '@/features/user/queries';
import { useChooseOption } from '@/features/vote/queries';
import { selectedVoteOptionIdAtom } from '@/features/vote/states/selected-vote-option';
import { voteAnimationIdAtom } from '@/features/vote/states/vote-animation';

export function VoteButton() {
  const { user } = useUser();
  const [selectedVoteOptionId, setSelectedVoteOptionId] = useAtom(
    selectedVoteOptionIdAtom,
  );
  const setVoteAnimationId = useSetAtom(voteAnimationIdAtom);
  const { mutate: chooseOption } = useChooseOption();

  const handleVote = async () => {
    if (user?.id && selectedVoteOptionId) {
      await chooseOption({
        userId: user.id,
        worryChoiceId: selectedVoteOptionId,
      });
      setVoteAnimationId(selectedVoteOptionId);
      setTimeout(() => {
        setVoteAnimationId(null);
      }, 1400);
    }
    setSelectedVoteOptionId(null);
  };

  useEffect(() => {
    setSelectedVoteOptionId(null);
  }, []);

  return (
    <FloatingButton
      onClick={handleVote}
      className={`absolute bottom-[4.8rem] left-1/2 z-50 -translate-x-1/2 ${
        selectedVoteOptionId !== null ? 'block' : 'hidden'
      }`}
    >
      투표하기
    </FloatingButton>
  );
}
