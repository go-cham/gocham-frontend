import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { Spacing } from '@/common/components/ui';
import { getRemainingTime } from '@/features/posts/utils/get-remaining-time';
import { useUser } from '@/features/user/queries';
import { PostVote } from '@/features/vote/components/PostVote';
import { VoteButton } from '@/features/vote/components/VoteButton';
import { VoteExpiration } from '@/features/vote/components/VoteExpiration';
import { VoteResult } from '@/features/vote/components/VoteResult';
import { useGetChoiceOptions, useGetMyChoice } from '@/features/vote/queries';
import { selectedVoteOptionIdAtom } from '@/features/vote/states/selected-vote-option';
import { voteAnimationIdAtom } from '@/features/vote/states/vote-animation';

interface VoteSectionProps {
  postId: number;
  expirationTime: string | null;
}

export function VoteSection({ postId, expirationTime }: VoteSectionProps) {
  const { user } = useUser();
  const { data: choiceOptions } = useGetChoiceOptions(postId);
  const { data: myChoice } = useGetMyChoice({
    postId: postId,
    userId: user?.id,
  });
  const selectedVoteOptionId = useAtomValue(selectedVoteOptionIdAtom);
  const setVoteAnimationId = useSetAtom(voteAnimationIdAtom);

  const remainingTime = getRemainingTime(expirationTime);
  const isClosed = remainingTime === 'closed';

  const showVoteButton = Boolean(
    choiceOptions.find((option) => option.id === selectedVoteOptionId),
  );

  useEffect(() => {
    return () => {
      setVoteAnimationId(null);
    };
  }, [setVoteAnimationId]);

  return (
    <div>
      {remainingTime && <VoteExpiration remainingTime={remainingTime} />}
      <Spacing size={'1.2rem'} />
      {isClosed || myChoice ? (
        <VoteResult options={choiceOptions} postId={postId} />
      ) : (
        <PostVote options={choiceOptions} postId={postId} />
      )}
      {showVoteButton && <VoteButton postId={postId} />}
    </div>
  );
}
