import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { RouteURL } from '@/App';
import useGetPosts from '@/apis/hooks/posts/useGetPosts';
import AppBar from '@/components/layout/AppBar';
import { userType } from '@/constants/userTypeEnum';
import { userAtom } from '@/states/userData';

import PostDetail from './PostDetail';

const FeedPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const userInfo = useAtomValue(userAtom);
  const { posts, error, ref, isLoading } = useGetPosts({
    initialPostId: params?.id ? Number(params.id) + 1 : undefined,
  });

  useEffect(() => {
    // HOC로 안잡히는 부분 잡기위함
    if (userInfo.userId === 0) {
      if (userInfo.userType !== userType.activatedUser) navigate(RouteURL.home);
    }
  }, [userInfo]);

  return (
    <div className="flex h-full flex-col">
      <AppBar
        title={
          params.route === 'my'
            ? '내 게시글'
            : params.route === 'participated'
            ? '참여한 게시글'
            : '인기 게시물'
        }
        background={'white'}
        navigateRoute={params.route ? RouteURL.user : RouteURL.home}
      />
      <ul
        className="flex-1 overflow-y-scroll"
        style={{ scrollSnapType: 'y proximity', scrollSnapAlign: 'start' }}
      >
        {posts &&
          posts.map((post, index) => (
            <li
              key={post.id}
              ref={index === posts.length - 1 ? ref : undefined}
            >
              <PostDetail userInfo={userInfo} postData={post} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FeedPage;
