import { useQueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';

import BottomAppBar from '@/components/layout/BottomAppBar';
import PageWrapper from '@/components/ui/PageWrapper';
import { Spacing } from '@/components/ui/Spacing';
import usePullToRefresh from '@/hooks/usePullToRefresh';
import useScrollRestoration from '@/hooks/useScrollRestoration';
import useScrollToTop from '@/hooks/useScrollToTop';
import HomeBanner from '@/pages/home/HomeBanner';
import HomeHeader from '@/pages/home/HomeHeader';
import PostCardList from '@/pages/home/PostCardList';
import PostCardListSkeleton from '@/pages/home/PostCardListSkeleton';
import { assignMultipleRefs } from '@/utils/assign-multiple-refs';

export default function HomePage() {
  const { ref: scrollToTopRef, scrollToTop } = useScrollToTop<HTMLDivElement>();
  const scrollRestorationRef = useScrollRestoration<HTMLDivElement>('home');
  const queryClient = useQueryClient();
  const pullToRefreshRef = usePullToRefresh<HTMLDivElement>({
    onRefresh: () => {
      queryClient.refetchQueries({
        queryKey: ['posts'],
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
        className={'hide-scrollbar overflow-scroll overscroll-y-none'}
      >
        <Spacing size={'10.3rem'} />
        <HomeBanner />
        <Spacing size={'2.1rem'} />
        <Suspense fallback={<PostCardListSkeleton />}>
          <PostCardList />
        </Suspense>
        <Spacing size={'12rem'} />
      </main>
      <BottomAppBar onScrollToTop={scrollToTop} />
    </PageWrapper>
  );
}
