import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CheckIcon from '@/common/components/icons/CheckIcon';
import ImageFullScreen from '@/common/components/ui/ImageFullScreen';
import Spacing from '@/common/components/ui/Spacing';
import useUser from '@/features/user/queries/useUser';
import { PercentageBar } from '@/features/vote/components/VoteResult/PercentageBar';
import useGetMyChoice from '@/features/vote/queries/useGetMyChoice';
import useGetUsersChoices from '@/features/vote/queries/useGetUsersChoices';
import { voteAnimationIdAtom } from '@/features/vote/states/vote-animation';

interface VoteResultProps {
  options: { id: number; label: string; image: string | null }[];
  postId: number;
}

export default function VoteResult({ postId, options }: VoteResultProps) {
  const { user } = useUser();
  const { data: usersChoices } = useGetUsersChoices(postId);
  const voteAnimationId = useAtomValue(voteAnimationIdAtom);
  const useAnimation = !!options?.find(
    (option) => option.id === voteAnimationId,
  );
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const { data: myChoice } = useGetMyChoice({
    postId: postId,
    userId: user?.id,
  });

  const hasVoted = !!myChoice && !myChoice.isAbstained;
  const mostVotedCount = usersChoices
    .filter((option) => !!option.label)
    .sort(
      (a, b) => b.userWorryChoiceCount - a.userWorryChoiceCount,
    )[0].userWorryChoiceCount;
  const mostVotedOptions = usersChoices.filter(
    (option) =>
      !!option.label && option.userWorryChoiceCount === mostVotedCount,
  );

  const total = usersChoices.reduce(
    (acc, cur) => acc + (!cur.isAbstained ? cur.userWorryChoiceCount : 0),
    0,
  );

  return (
    <div className="space-y-[2.1rem] rounded-[0.5rem] border border-background-dividerLine-300 px-[1.7rem] py-[1.5rem]">
      {options.map((option) => {
        const count =
          usersChoices.find((o) => o.id === option.id)?.userWorryChoiceCount ||
          0;
        const percentage = total === 0 ? 0 : Math.round((count / total) * 100);

        return (
          <div key={option.id}>
            <div key={option.id} className="relative flex">
              {hasVoted && (
                <CheckIcon
                  color={myChoice?.id === option.id ? '#222222' : '#e0e0e0'}
                />
              )}
              <div className="ml-[0.6rem] flex flex-col">
                <span className="font-system-body4">{option.label}</span>
                <span className="text-text-explain-500 font-system-body1">
                  {percentage}% ({count}명)
                </span>
              </div>
              {option.image && (
                <LazyLoadImage
                  src={option.image}
                  alt={option.label}
                  className="absolute right-0 aspect-square h-full cursor-pointer object-cover"
                  onClick={(e) => {
                    setZoomedImage(option.image);
                    e.stopPropagation();
                  }}
                />
              )}
            </div>
            <Spacing size={'0.4rem'} />
            <PercentageBar
              percentage={percentage}
              colored={hasVoted}
              accented={
                (hasVoted && option.id === myChoice?.id) ||
                (!hasVoted &&
                  mostVotedOptions
                    .map((option) => option.id)
                    .includes(option.id))
              }
              useAnimation={useAnimation}
              useCharacter={option.id === myChoice?.id}
            />
          </div>
        );
      })}
      {zoomedImage && (
        <ImageFullScreen
          images={[zoomedImage]}
          initialIndex={0}
          onClose={() => setZoomedImage(null)}
        />
      )}
    </div>
  );
}
