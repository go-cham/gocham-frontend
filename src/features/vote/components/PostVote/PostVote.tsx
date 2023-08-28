import { useSetAtom } from 'jotai';
import { useState } from 'react';
import ImageFullScreen from '@/common/components/ui/ImageFullScreen';
import Popup from '@/common/components/ui/modal/Popup';
import useUser from '@/features/user/queries/useUser';
import PostVoteButton from '@/features/vote/components/PostVote/PostVoteButton';
import useChooseOption from '@/features/vote/queries/useChooseOption';
import useGetUsersChoices from '@/features/vote/queries/useGetUsersChoices';
import { selectedVoteOptionIdAtom } from '@/features/vote/states/selected-vote-option';

interface PostVoteProps {
  options: { id: number; label: string; image: string | null }[];
  postId: number;
}

export default function PostVote({ postId, options }: PostVoteProps) {
  const { user } = useUser();
  const setSelectedVoteOptionId = useSetAtom(selectedVoteOptionIdAtom);
  const { data: usersChoices } = useGetUsersChoices(postId);
  const [onlyReadModalOpen, setOnlyReadModalOpen] = useState(false);
  const { mutate: chooseOption } = useChooseOption({
    postId,
    userId: user?.id,
  });
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  if (!options || !usersChoices) {
    return null;
  }

  const handleAbstention = () => {
    if (!user) {
      return null;
    }

    const choiceId = usersChoices.find((option) => option.isAbstained)?.id;
    if (!choiceId) {
      return;
    }
    chooseOption({ userId: user.id, worryChoiceId: choiceId });
    setOnlyReadModalOpen(false);
  };

  const total = usersChoices
    .filter((option) => !!option.label)
    .reduce((acc, cur) => acc + cur.userWorryChoiceCount, 0);

  return (
    <>
      <div className="flex flex-col space-y-[1.2rem]">
        {options.map((option) => (
          <PostVoteButton
            key={option.id}
            option={option}
            postId={postId}
            onClickImage={(image) => setZoomedImage(image)}
          />
        ))}
      </div>
      <div className="mt-[1.5rem] flex justify-between text-text-explain-500 font-system-body2">
        <button
          className="underline"
          onClick={() => {
            setSelectedVoteOptionId(null);
            setOnlyReadModalOpen(true);
          }}
        >
          결과만 볼래요
        </button>
        <span>현재 투표한 사용자 {total}명</span>
      </div>
      {zoomedImage && (
        <ImageFullScreen
          images={[zoomedImage]}
          initialIndex={0}
          onClose={() => setZoomedImage(null)}
        />
      )}
      <Popup
        isOpen={onlyReadModalOpen}
        text={'결과를 열람하시면\n투표에 참여하실 수 없습니다.'}
        buttonLabel="그래도 볼게요"
        onCancel={() => setOnlyReadModalOpen(false)}
        onClickButton={handleAbstention}
      />
    </>
  );
}
