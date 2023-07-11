import { useAtom } from 'jotai';
import { useParams } from 'react-router-dom';

import useChooseOption from '@/apis/hooks/posts/useChooseOption';
import useGetPosts from '@/apis/hooks/posts/useGetPosts';
import useUser from '@/apis/hooks/users/useUser';
import TopAppBar from '@/components/layout/TopAppBar';
import FloatingButton from '@/components/ui/buttons/FloatingButton';
import withAuth from '@/components/withAuth';
import { RouteURL } from '@/constants/route-url';
import { selectedVoteOptionIdAtom } from '@/states/selectedVoteOption';

import PostDetail from './PostDetail';

function FeedPage() {
  const params = useParams();
  const { user } = useUser();
  const { route } = useParams();
  const { posts, ref } = useGetPosts({
    initialPostId: params?.id ? Number(params.id) + 1 : undefined,
    authorId: route === 'my' ? user?.id : undefined,
    participatingUserId: route === 'participating' ? user?.id : undefined,
  });
  const { chooseOption } = useChooseOption();
  const [selectedVoteOptionId, setSelectedVoteOptionId] = useAtom(
    selectedVoteOptionIdAtom
  );

  const handleVote = () => {
    if (user?.id && selectedVoteOptionId) {
      chooseOption({
        userId: user.id,
        worryChoiceId: selectedVoteOptionId,
      });
    }
    setSelectedVoteOptionId(null);
  };

  return (
    <div className="flex h-full flex-col">
      <TopAppBar
        title={
          params.route === 'my'
            ? '내 게시글'
            : params.route === 'participating'
            ? '참여한 게시글'
            : '최신 게시물'
        }
        background={'white'}
        navigateRoute={params.route ? RouteURL.user : RouteURL.home}
      />
      <ul
        className="hide-scrollbar flex-1 overflow-y-scroll pt-[0.9rem]"
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
      {selectedVoteOptionId && (
        <FloatingButton
          onClick={handleVote}
          className="absolute bottom-[4.8rem] left-1/2 z-50 -translate-x-1/2"
        >
          투표하기
        </FloatingButton>
      )}
    </div>
  );
}

export default withAuth(FeedPage, { block: 'unauthenticated' });
