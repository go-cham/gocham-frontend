import { Suspense, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import TopAppBar from '@/components/layout/TopAppBar';
import PageWrapper from '@/components/ui/PageWrapper';
import withAuth from '@/components/withAuth';
import { POST_TYPE } from '@/constants/post-type';
import PostDetailList from '@/pages/feed/components/PostDetailList';
import PostDetailListSkeleton from '@/pages/feed/components/PostDetailListSkeleton';
import VoteButton from '@/pages/feed/components/VoteButton';

function FeedPage() {
  const params = useParams();
  const postType = (params.route as POST_TYPE) || POST_TYPE.ALL;

  useEffect(() => {
    localStorage.setItem('navAfterEdit', params.route || '');
  }, [params.route]);

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
      <VoteButton />
    </PageWrapper>
  );
}

export default withAuth(FeedPage, { block: 'unauthenticated' });
