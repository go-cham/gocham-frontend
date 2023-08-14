import useGetPosts from '@/apis/hooks/posts/useGetPosts';
import useUser from '@/apis/hooks/users/useUser';
import { PostType } from '@/pages/user/UserPage';

interface PostTypeTabListProps {
  selectedPostType: PostType;
  onSelect: (postType: PostType) => void;
}

export default function PostTypeTabList({
  selectedPostType,
  onSelect,
}: PostTypeTabListProps) {
  const { user } = useUser();
  const { totalCount: myPostsCount } = useGetPosts({
    authorId: user?.id,
  });
  const { totalCount: participatedPostsCount } = useGetPosts({
    participatingUserId: user?.id,
  });

  const handleTabSelect = (postType: PostType) => {
    onSelect(postType);
  };

  return (
    <div className="mx-[2.5rem] flex justify-between space-x-[1.2rem] rounded-[2.35rem] bg-background-subBg-100">
      <PostTypeTab
        label={'내 게시글'}
        count={myPostsCount}
        selected={selectedPostType === 'my'}
        onSelect={() => handleTabSelect('my')}
      />
      <PostTypeTab
        label={'참여한 게시글'}
        count={participatedPostsCount}
        selected={selectedPostType === 'participated'}
        onSelect={() => handleTabSelect('participated')}
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
