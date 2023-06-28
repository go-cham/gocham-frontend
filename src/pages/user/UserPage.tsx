import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useGetPosts from '@/apis/hooks/posts/useGetPosts';
import PostCard from '@/components/post/PostCard';
import SelectMyPostType from '@/components/user/SelectMyPostType';
import UserProfile from '@/components/user/UserProfile';
import { RouteURL } from '@/constants/route-url';
import { userType } from '@/constants/userTypeEnum';
import { userAtom } from '@/states/userData';

export type PostType = 'my' | 'participating';

const UserPage = () => {
  const userInfo = useAtomValue(userAtom);
  const navigate = useNavigate();

  const [postType, setPostType] = useState<PostType>('my');
  const {
    posts: myPosts,
    totalCount: myPostsTotal,
    ref: myPostsRef,
  } = useGetPosts({
    authorId: userInfo.userId,
  });
  const {
    posts: participatingPosts,
    totalCount: participatingPostsTotal,
    ref: participatingPostsRef,
  } = useGetPosts({
    participatingUserId: userInfo.userId,
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

  useEffect(() => {
    // HOC로 안잡히는 부분 잡기위함
    if (userInfo.userType !== userType.activatedUser) navigate(RouteURL.home);
  }, [userInfo]);

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
                userInfo={userInfo}
                postData={post}
                routeUrl={postType}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UserPage;
