import { useSetAtom } from 'jotai';
import { Suspense, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageWrapper from '@/common/components/layout/PageWrapper';
import TopAppBar from '@/common/components/layout/TopAppBar';
import { POST_TYPE } from '@/common/constants/post-type';
import PostDetailList from '@/features/posts/components/post-detail/PostDetailList';
import PostDetailListSkeleton from '@/features/posts/components/post-detail/PostDetailListSkeleton';
import { selectedVoteOptionIdAtom } from '@/features/vote/states/selected-vote-option';

export default function FeedPage() {
  const params = useParams();
  const postType = (params.route as POST_TYPE) || POST_TYPE.ALL;
  const setSelectedVoteOptionId = useSetAtom(selectedVoteOptionIdAtom);

  useEffect(() => {
    localStorage.setItem('navAfterEdit', params.route || '');
  }, [params.route]);

  useEffect(() => {
    return () => setSelectedVoteOptionId(null);
  }, [setSelectedVoteOptionId]);

  const topAppBarTitle =
    postType === POST_TYPE.MY
      ? '내 게시글'
      : postType === POST_TYPE.PARTICIPATED
      ? '참여한 게시글'
      : '최신 게시물';

  return (
    <PageWrapper>
      <TopAppBar title={topAppBarTitle} />
      <Suspense fallback={<PostDetailListSkeleton />}>
        <PostDetailList type={postType} />
      </Suspense>
    </PageWrapper>
  );
}
