import { useQueryClient } from '@tanstack/react-query';

import BottomAppBar from '@/components/layout/BottomAppBar';
import PageWrapper from '@/components/ui/PageWrapper';
import { Spacing } from '@/components/ui/Spacing';
import usePullToRefresh from '@/hooks/usePullToRefresh';
import useScrollRestoration from '@/hooks/useScrollRestoration';
import useScrollToTop from '@/hooks/useScrollToTop';
import HomeBanner from '@/pages/home/HomeBanner';
import HomeHeader from '@/pages/home/HomeHeader';
import PostCardList from '@/pages/home/PostCardList';
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
      <HomeHeader onClickLogo={scrollToTop} />
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
        <PostCardList />
        <Spacing size={'12rem'} />
      </main>
      <BottomAppBar onScrollToTop={scrollToTop} />
    </PageWrapper>
  );
}
