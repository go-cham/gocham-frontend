import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useGetPosts from '@/apis/hooks/posts/useGetPosts';
import useUser from '@/apis/hooks/users/useUser';
import PostCard from '@/components/post/PostCard';
import SelectMyPostType from '@/components/user/SelectMyPostType';
import UserProfile from '@/components/user/UserProfile';
import withAuth from '@/components/withAuth';
import { RouteURL } from '@/constants/route-url';
import { userType } from '@/constants/userTypeEnum';
import { userAtom } from '@/states/userData';

export type PostType = 'my' | 'participating';

const UserPage = () => {
  const { user } = useUser();
  console.log(user);

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
              <PostCard postData={post} routeUrl={postType} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default withAuth(UserPage, { block: 'unauthenticated' });
