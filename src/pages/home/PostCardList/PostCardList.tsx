import useGetPosts from '@/apis/hooks/posts/useGetPosts';
import PostCard from '@/components/post/PostCard';

const PostCardList = () => {
  const { posts, ref } = useGetPosts();

  return (
    <ul className="flex scroll-mb-[30rem] flex-col items-center space-y-[1.7rem] pb-[10rem] pt-[2rem]">
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
