import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useGetPosts from '@/apis/hooks/posts/useGetPosts';
import useUser from '@/apis/hooks/users/useUser';
import BottomAppBar from '@/components/layout/BottomAppBar/BottomAppBar';
import PostCard from '@/components/post/PostCard';
import SelectMyPostType from '@/components/user/SelectMyPostType';
import UserProfile from '@/components/user/UserProfile';
import withAuth from '@/components/withAuth';
import { RouteURL } from '@/constants/route-url';
import { userType } from '@/constants/userTypeEnum';
import SettingIcon from '@/images/Profile/settings.svg';

export type PostType = 'my' | 'participating';

function UserPage() {
  const { user } = useUser();
  const navigate = useNavigate();

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
      <img
        src={SettingIcon}
        alt={'설정'}
        className="mr-[2.5rem] mt-[1.2rem] w-[3.2rem] cursor-pointer self-end"
        onClick={() => navigate(RouteURL.settings)}
      />
      <UserProfile />
      <div className="my-[1.9rem] h-[1px] w-full bg-custom-gray-300" />
      <SelectMyPostType
        postType={postType}
        switchPostType={switchPostType}
        postingCount={postingCount}
      />
      <ul className="hide-scrollbar flex flex-1 flex-col items-center space-y-[1.7rem] overflow-y-scroll px-[2.5rem] pb-[16rem]">
        {posts &&
          posts?.map((post, index) => (
            <li
              key={post.id}
              ref={index === posts.length - 1 ? ref : undefined}
              className="w-full"
            >
              <PostCard
                post={post}
                routeUrl={postType}
                loggedIn={user?.type === userType.activatedUser}
                showProfile={postType !== 'my'}
              />
            </li>
          ))}
      </ul>
      <BottomAppBar />
    </div>
  );
}

export default withAuth(UserPage, { block: 'unauthenticated' });
