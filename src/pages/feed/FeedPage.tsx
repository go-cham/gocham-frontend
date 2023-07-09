import { useAtomValue } from 'jotai';
import { useAtom } from 'jotai/index';
import { useParams } from 'react-router-dom';

import useGetPosts from '@/apis/hooks/posts/useGetPosts';
import TopAppBar from '@/components/layout/TopAppBar';
import FloatingButton from '@/components/ui/buttons/FloatingButton';
import Snackbar from '@/components/ui/modal/Snackbar';
import withAuth from '@/components/withAuth';
import { RouteURL } from '@/constants/route-url';
import { selectedVoteOptionAtom } from '@/states/selectedVoteOption';
import { userAtom } from '@/states/userData';

import PostDetail from './PostDetail';

function FeedPage() {
  const params = useParams();
  const userInfo = useAtomValue(userAtom);
  const { route } = useParams();
  const { posts, ref } = useGetPosts({
    initialPostId: params?.id ? Number(params.id) + 1 : undefined,
    authorId: route === 'my' ? userInfo.userId : undefined,
    participatingUserId:
      route === 'participating' ? userInfo.userId : undefined,
  });
  const selectedVoteOption = useAtomValue(selectedVoteOptionAtom);

  const showGoBack = selectedVoteOption?.id && !selectedVoteOption?.inView;

  const handleGoBack = () => {
    const button = document.querySelector('#vote-selected');
    if (button) {
      button.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

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
      {showGoBack && (
        <Snackbar
          text="다른 게시물에 동시에 투표할 수 없어요."
          actionText="원위치로 이동"
          className="fixed bottom-[11rem] left-1/2 -translate-x-1/2"
          onClick={handleGoBack}
        />
      )}
      {selectedVoteOption && (
        <FloatingButton className="fixed bottom-[4.8rem] left-1/2 z-50 -translate-x-1/2">
          투표하기
        </FloatingButton>
      )}
    </div>
  );
}

export default withAuth(FeedPage, { block: 'unauthenticated' });
