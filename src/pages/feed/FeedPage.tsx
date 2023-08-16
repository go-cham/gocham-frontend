import { Suspense, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { PageWrapper } from '@/common/components/layout/PageWrapper/PageWrapper';
import { TopAppBar } from '@/common/components/layout/TopAppBar/TopAppBar';
import { POST_TYPE } from '@/common/constants/post-type';
import { withAuth } from '@/features/auth/components/withAuth/withAuth';
import { PostDetailList } from '@/features/posts/components/PostDetailList';
import { PostDetailListSkeleton } from '@/features/posts/components/PostDetailListSkeleton';
import { VoteButton } from '@/features/vote/components/VoteButton';

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
