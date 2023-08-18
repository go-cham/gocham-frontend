import { POST_TYPE } from '@/common/constants/post-type';
import { useGetPosts } from '@/features/posts/queries';
import { useUser } from '@/features/user/queries';

interface PostTypeTabListProps {
  selectedPostType: POST_TYPE;
  onSelect: (postType: POST_TYPE) => void;
}

export function PostTypeTabList({
  selectedPostType,
  onSelect,
}: PostTypeTabListProps) {
  const { user } = useUser();
  const { totalCount: myPostsCount } = useGetPosts({
    userId: user?.id,
    type: POST_TYPE.MY,
  });
  const { totalCount: participatedPostsCount } = useGetPosts({
    userId: user?.id,
    type: POST_TYPE.PARTICIPATED,
  });

  const handleTabSelect = (postType: POST_TYPE) => {
    onSelect(postType);
  };

  return (
    <div className="mx-[2.5rem] flex justify-between space-x-[1.2rem] rounded-[2.35rem] bg-background-subBg-100">
      <PostTypeTab
        label={'내 게시글'}
        count={myPostsCount}
        selected={selectedPostType === POST_TYPE.MY}
        onSelect={() => handleTabSelect(POST_TYPE.MY)}
      />
      <PostTypeTab
        label={'참여한 게시글'}
        count={participatedPostsCount}
        selected={selectedPostType === POST_TYPE.PARTICIPATED}
        onSelect={() => handleTabSelect(POST_TYPE.PARTICIPATED)}
      />
    </div>
  );
}

interface PostTypeTabProps {
  label: string;
  count: number;
  selected: boolean;
  onSelect: () => void;
}

function PostTypeTab({ label, count, selected, onSelect }: PostTypeTabProps) {
  return (
    <button
      className={`w-full select-none py-[0.8rem] text-center font-system-body4 ${
        selected
          ? 'rounded-[2.35rem] bg-text-subTitle-700 text-white'
          : 'text-text-explain-500'
      }`}
      onClick={onSelect}
    >
      {`${label} ${count}`}
    </button>
  );
}
