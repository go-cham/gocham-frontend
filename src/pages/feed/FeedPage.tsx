import { useAtomValue } from 'jotai';
import { useParams } from 'react-router-dom';

import useGetPosts from '@/apis/hooks/posts/useGetPosts';
import TopAppBar from '@/components/layout/TopAppBar';
import withAuth from '@/components/withAuth';
import { RouteURL } from '@/constants/route-url';
import { userAtom } from '@/states/userData';

import PostDetail from './PostDetail';

function FeedPage() {
  const params = useParams();
  const userInfo = useAtomValue(userAtom);
  const { route } = useParams();
  const { posts, error, ref, isLoading } = useGetPosts({
    initialPostId: params?.id ? Number(params.id) + 1 : undefined,
    authorId: route === 'my' ? userInfo.userId : undefined,
    participatingUserId:
      route === 'participating' ? userInfo.userId : undefined,
  });

  return (
    <div className="flex h-full flex-col">
      <TopAppBar
        title={
          params.route === 'my'
            ? '내 게시글'
            : params.route === 'participated'
            ? '참여한 게시글'
            : '최신 게시물'
        }
        background={'white'}
        navigateRoute={params.route ? RouteURL.user : RouteURL.home}
      />
      <ul
        className="flex-1 overflow-y-scroll pt-[0.9rem]"
        style={{ scrollSnapType: 'y proximity', scrollSnapAlign: 'start' }}
      >
        {posts &&
          posts.map((post, index) => (
            <li
              key={post.id}
              ref={index === posts.length - 1 ? ref : undefined}
            >
              <PostDetail post={post} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default withAuth(FeedPage, { block: 'unauthenticated' });
