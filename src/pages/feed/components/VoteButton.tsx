import { useAtom, useSetAtom } from 'jotai/index';
import { useEffect } from 'react';

import useChooseOption from '@/apis/hooks/posts/useChooseOption';
import useUser from '@/apis/hooks/users/useUser';
import FloatingButton from '@/components/ui/buttons/FloatingButton';
import { selectedVoteOptionIdAtom } from '@/states/selectedVoteOption';
import { voteAnimationIdAtom } from '@/states/vote-animation';

export default function VoteButton() {
  const { user } = useUser();
  const [selectedVoteOptionId, setSelectedVoteOptionId] = useAtom(
    selectedVoteOptionIdAtom,
  );
  const setVoteAnimationId = useSetAtom(voteAnimationIdAtom);
  const { chooseOption } = useChooseOption();

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
