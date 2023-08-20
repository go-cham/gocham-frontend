import { POST_TYPE } from '@/common/constants/post-type';
import { PostCard } from '@/features/posts/components/PostCard';
import { useGetPosts } from '@/features/posts/queries';
import { useUser } from '@/features/user/queries/useUser';
import NoPost from '@/pages/write/NoPost';

interface PostCardListProps {
  type: POST_TYPE;
}

export function PostCardList({ type }: PostCardListProps) {
  const { user } = useUser();
  const { posts, ref } = useGetPosts({
    userId: user?.id,
    type,
  });

  return posts && posts.length > 0 ? (
    <ul className={'flex w-full flex-col items-center space-y-[1.7rem]'}>
      {posts.map((post, index) => (
        <li
          key={post.id}
          ref={index === posts.length - 1 ? ref : undefined}
          className="w-full"
        >
          <PostCard post={post} type={type} />
        </li>
      ))}
    </ul>
  ) : type === POST_TYPE.MY ? (
    <NoPost text="아직 작성한 게시물이 없어요." textLink="글 작성 시작" />
  ) : type === POST_TYPE.PARTICIPATED ? (
    <NoPost text="투표하거나 댓글 남긴 게시글이 없어요." />
  ) : null;
}
