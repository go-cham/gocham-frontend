import { useAtomValue } from 'jotai';

import useGetPosts from '@/apis/hooks/posts/useGetPosts';
import PostCard from '@/components/post/PostCard';
import { userAtom } from '@/states/userData';

const PostCardList = () => {
  const userInfo = useAtomValue(userAtom);
  const { posts, ref, isLoading, error } = useGetPosts();

  return (
    <ul className="flex flex-col items-center space-y-[1.7rem] pb-[10rem] pt-[2rem]">
      {posts &&
        posts.map((post, index) => (
          <li key={post.id} ref={index === posts.length - 1 ? ref : undefined}>
            <PostCard postData={post} />
          </li>
        ))}
    </ul>
  );
};
export default PostCardList;
