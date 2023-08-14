import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useChooseOption from '@/apis/hooks/posts/useChooseOption';
import useUser from '@/apis/hooks/users/useUser';
import TopAppBar from '@/components/layout/TopAppBar';
import FloatingButton from '@/components/ui/buttons/FloatingButton';
import PostDetailSkeleton from '@/components/ui/skeleton/PostDetailSkeleton';
import withAuth from '@/components/withAuth';
import { POST_TYPE } from '@/constants/post-type';
import { RouteURL } from '@/constants/route-url';
import useGetPosts from '@/hooks/useGetPosts';
import useScrollRestoration from '@/hooks/useScrollRestoration';
import { selectedVoteOptionIdAtom } from '@/states/selectedVoteOption';
import { voteAnimationIdAtom } from '@/states/vote-animation';

import PostDetail from './PostDetail';

function FeedPage() {
  const params = useParams();
  const { user } = useUser();
  const initialPostId = params.id ? Number(params.id) : undefined;
  const { posts, ref } = useGetPosts({
    initialPostId,
    userId: user?.id,
    type: (params.route as POST_TYPE) || POST_TYPE.ALL,
  });
  const { chooseOption } = useChooseOption();
  const [selectedVoteOptionId, setSelectedVoteOptionId] = useAtom(
    selectedVoteOptionIdAtom,
  );
  const setVoteAnimationId = useSetAtom(voteAnimationIdAtom);
  const scrollRef = useScrollRestoration<HTMLUListElement>('feed');

  const handleVote = async () => {
    if (user?.id && selectedVoteOptionId) {
      await chooseOption({
        userId: user.id,
        worryChoiceId: selectedVoteOptionId,
      });
      setVoteAnimationId(selectedVoteOptionId);
      setTimeout(() => {
        setVoteAnimationId(null);
      }, 1400);
    }
    setSelectedVoteOptionId(null);
  };

  useEffect(() => {
    setSelectedVoteOptionId(null);
  }, []);

  useEffect(() => {
    localStorage.setItem('navAfterEdit', params.route || '');
  }, []);

  return (
    <div className="flex h-full flex-col">
      <TopAppBar
        title={
          params.route === POST_TYPE.MY
            ? '내 게시글'
            : params.route === POST_TYPE.PARTICIPATED
            ? '참여한 게시글'
            : '최신 게시물'
        }
        navigateRoute={params.route ? RouteURL.user : RouteURL.home}
      />
      {posts ? (
        <ul
          className="hide-scrollbar flex-1 overflow-y-scroll pt-[0.9rem]"
          style={{ scrollSnapType: 'y proximity', scrollSnapAlign: 'start' }}
          ref={scrollRef}
        >
          {posts.map((post, index) => (
            <li
              key={post.id}
              ref={index === posts.length - 1 ? ref : undefined}
            >
              <PostDetail post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <ul
          className="hide-scrollbar flex-1 overflow-y-scroll pt-[0.9rem]"
          style={{ scrollSnapType: 'y proximity', scrollSnapAlign: 'start' }}
        >
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <PostDetailSkeleton key={i} />
            ))}
        </ul>
      )}
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
