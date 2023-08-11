import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useGetPosts from '@/apis/hooks/posts/useGetPosts';
import useUser from '@/apis/hooks/users/useUser';
import BottomAppBar from '@/components/layout/BottomAppBar/BottomAppBar';
import PostCard from '@/components/post/PostCard';
import PostCardSkeleton from '@/components/ui/skeleton/PostCardSkeleton';
import SelectMyPostType from '@/components/user/SelectMyPostType';
import UserProfile from '@/components/user/UserProfile';
import withAuth from '@/components/withAuth';
import { ADMIN_EMAIL } from '@/constants/admin';
import { RouteURL } from '@/constants/route-url';
import { UserType } from '@/constants/user-type';
import usePullToRefresh from '@/hooks/usePullToRefresh';
import useScrollRestoration from '@/hooks/useScrollRestoration';
import SettingIcon from '@/images/Profile/settings.svg';
import { calculateAgeFromBirthday } from '@/utils/date/calculateAge';

export type PostType = 'my' | 'participating';

function UserPage() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const ptrRef = usePullToRefresh<HTMLUListElement>({
    onRefresh: () => {
      setIsLoading(true);
      queryClient
        .refetchQueries({
          queryKey: ['posts'],
        })
        .then(() => setIsLoading(false));
    },
  });

  const initialPostType =
    (sessionStorage.getItem('selectMyPostTypeLabel') as PostType) || 'my';
  const [postType, setPostType] = useState<PostType>(initialPostType);
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
  const myPostsScrollRef = useScrollRestoration<HTMLUListElement>('my');
  const participatingPostsScrollRef =
    useScrollRestoration<HTMLUListElement>('participating');

  const postingCount = {
    written: myPostsTotal,
    participated: participatingPostsTotal,
  };

  const switchPostType = (postType: PostType) => {
    setPostType(postType);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mr-[2.5rem] mt-[1.2rem] h-[3.2rem] w-[3.2rem] cursor-pointer self-end">
        <img
          src={SettingIcon}
          alt={'설정'}
          onClick={() => navigate(RouteURL.settings)}
        />
      </div>
      <div className="mt-[1.7rem] flex items-center justify-between px-[2.5rem]">
        <UserProfile
          nickname={user.nickname}
          age={calculateAgeFromBirthday(user.birthday)}
          isAdmin={user.email === ADMIN_EMAIL}
          size="large"
        />
        <button
          className="rounded-[0.5rem] bg-background-voteBg-100 px-[1rem] py-[0.7rem] text-text-subTitle-700 font-system-body2"
          onClick={() => navigate(RouteURL.edit_profile)}
        >
          프로필 편집
        </button>
      </div>
      <div className="my-[1.9rem] h-[1px] w-full bg-background-dividerLine-300" />
      <SelectMyPostType
        postType={postType}
        switchPostType={switchPostType}
        postingCount={postingCount}
      />
      <ul
        id={postType === 'my' ? 'my-posts' : 'participating-posts'}
        ref={(el) => {
          if (postType === 'my') {
            myPostsScrollRef.current = el;
          } else {
            participatingPostsScrollRef.current = el;
          }
          ptrRef.current = el;
        }}
        className="hide-scrollbar flex flex-1 flex-col items-center space-y-[1.7rem] overflow-y-scroll px-[2.5rem] pb-[16rem]"
      >
        {posts && !isLoading
          ? posts.map((post, index) => (
              <li
                key={post.id}
                ref={index === posts.length - 1 ? ref : undefined}
                className="w-full"
              >
                <PostCard
                  post={post}
                  routeUrl={postType}
                  loggedIn={user?.type === UserType.activatedUser}
                  showProfile={postType !== 'my'}
                />
              </li>
            ))
          : Array(10)
              .fill(null)
              .map((_, index) => (
                <PostCardSkeleton key={index} hasProfile={false} />
              ))}
      </ul>
      <BottomAppBar currentPage="user" />
    </div>
  );
}

export default withAuth(UserPage, { block: 'unauthenticated' });
