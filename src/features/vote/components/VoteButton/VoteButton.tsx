import { useAtom, useSetAtom } from 'jotai';
import FloatingButton from '@/common/components/ui/buttons/FloatingButton';
import useUser from '@/features/user/queries/useUser';
import useChooseOption from '@/features/vote/queries/useChooseOption';
import { selectedVoteOptionIdAtom } from '@/features/vote/states/selected-vote-option';
import { voteAnimationIdAtom } from '@/features/vote/states/vote-animation';

interface VoteButtonProps {
  postId: number;
}

export default function VoteButton({ postId }: VoteButtonProps) {
  const { user } = useUser();
  const [selectedVoteOptionId, setSelectedVoteOptionId] = useAtom(
    selectedVoteOptionIdAtom,
  );
  const setVoteAnimationId = useSetAtom(voteAnimationIdAtom);
  const { mutate: chooseOption } = useChooseOption({
    postId,
    userId: user?.id,
  });

  const handleVote = async () => {
    if (user?.id && selectedVoteOptionId) {
      await chooseOption({
        userId: user.id,
        worryChoiceId: selectedVoteOptionId,
      });
      setVoteAnimationId(selectedVoteOptionId);
    }
    setSelectedVoteOptionId(null);
  };

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
