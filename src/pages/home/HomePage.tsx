import { useQueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';
import HomeHeader from 'src/pages/home/components/HomeHeader';
import PostCardList from 'src/pages/home/components/PostCardList';

import BottomAppBar from '@/components/layout/BottomAppBar';
import PageWrapper from '@/components/ui/PageWrapper';
import { Spacing } from '@/components/ui/Spacing';
import { POST_TYPE } from '@/constants/post-type';
import usePullToRefresh from '@/hooks/usePullToRefresh';
import useScrollRestoration from '@/hooks/useScrollRestoration';
import useScrollToTop from '@/hooks/useScrollToTop';
import HomeBanner from '@/pages/home/components/HomeBanner';
import PostCardListSkeleton from '@/pages/home/components/PostCardListSkeleton';
import { assignMultipleRefs } from '@/utils/assign-multiple-refs';

export default function HomePage() {
  const { ref: scrollToTopRef, scrollToTop } = useScrollToTop();
  const scrollRestorationRef = useScrollRestoration('home');
  const queryClient = useQueryClient();
  const pullToRefreshRef = usePullToRefresh({
    onRefresh: () => {
      queryClient.refetchQueries({
        queryKey: ['posts', { type: POST_TYPE.ALL }],
      });
    },
    topOffset: 80,
  });

  return (
    <PageWrapper>
      <Suspense fallback={null}>
        <HomeHeader onClickLogo={scrollToTop} />
      </Suspense>
      <main
        ref={(el) =>
          assignMultipleRefs(el, [
            scrollToTopRef,
            scrollRestorationRef,
            pullToRefreshRef,
          ])
        }
        className={'hide-scrollbar overflow-y-scroll overscroll-y-none'}
      >
        <Spacing size={'10.3rem'} />
        <HomeBanner />
        <div className={'mx-[2.5rem]'}>
          <Spacing size={'2.1rem'} />
          <Suspense fallback={<PostCardListSkeleton />}>
            <PostCardList type={POST_TYPE.ALL} />
          </Suspense>
          <Spacing size={'12rem'} />
        </div>
      </main>
      <BottomAppBar onScrollToTop={scrollToTop} />
    </PageWrapper>
  );
}
