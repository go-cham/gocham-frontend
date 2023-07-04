import { useState } from 'react';

import useGetPosts from '@/apis/hooks/posts/useGetPosts';
import useUser from '@/apis/hooks/users/useUser';
import BottomAppBar from '@/components/layout/BottomAppBar/BottomAppBar';
import PostCard from '@/components/post/PostCard';
import SelectMyPostType from '@/components/user/SelectMyPostType';
import UserProfile from '@/components/user/UserProfile';
import withAuth from '@/components/withAuth';
import { userType } from '@/constants/userTypeEnum';

export type PostType = 'my' | 'participating';

function UserPage() {
  const { user } = useUser();

  const [postType, setPostType] = useState<PostType>('my');
  const {
    posts: myPosts,
    totalCount: myPostsTotal,
    ref: myPostsRef,
  } = useGetPosts({
    authorId: user?.id,
  });
  const {
    posts: participatingPosts,
    totalCount: participatingPostsTotal,
    ref: participatingPostsRef,
  } = useGetPosts({
    participatingUserId: user?.id,
  });
  const posts = postType === 'my' ? myPosts : participatingPosts;
  const ref = postType === 'my' ? myPostsRef : participatingPostsRef;

  const postingCount = {
    written: myPostsTotal,
    participated: participatingPostsTotal,
  };

  const switchPostType = (postType: PostType) => {
    setPostType(postType);
  };

  return (
    <div className="flex h-full flex-col">
      <UserProfile />
      <SelectMyPostType
        postType={postType}
        switchPostType={switchPostType}
        postingCount={postingCount}
      />
      <ul className="flex flex-1 flex-col items-center space-y-[1.7rem] overflow-y-scroll pb-[16rem]">
        {posts &&
          posts?.map((post, index) => (
            <li
              key={post.id}
              ref={index === posts.length - 1 ? ref : undefined}
            >
              <PostCard
                post={post}
                routeUrl={postType}
                loggedIn={user?.type === userType.activatedUser}
              />
            </li>
          ))}
      </ul>
      <BottomAppBar />
    </div>
  );
}

export default withAuth(UserPage, { block: 'unauthenticated' });
