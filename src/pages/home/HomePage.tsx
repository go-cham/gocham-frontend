import { useQueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';
import { Online } from 'react-detect-offline';
import { BottomAppBar, PageWrapper } from '@/common/components/layout';
import { Spacing } from '@/common/components/ui';
import { POST_TYPE } from '@/common/constants/post-type';
import { usePullToRefresh } from '@/common/hooks/usePullToRefresh';
import { useScrollRestoration } from '@/common/hooks/useScrollRestoration';
import { useScrollToTop } from '@/common/hooks/useScrollToTop';
import { assignMultipleRefs } from '@/common/utils/dom/assign-multiple-refs';
import {
  PostCardList,
  PostCardListSkeleton,
} from '@/features/posts/components/post-card';
import HomeBanner from '@/pages/home/components/HomeBanner';
import HomeHeader from '@/pages/home/components/HomeHeader';

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
        <Online>
          <div className={'mx-[2.5rem]'}>
            <Spacing size={'2.1rem'} />
            <Suspense fallback={<PostCardListSkeleton />}>
              <PostCardList type={POST_TYPE.ALL} />
            </Suspense>
            <Spacing size={'12rem'} />
          </div>
        </Online>
      </main>
      <BottomAppBar onScrollToTop={scrollToTop} />
    </PageWrapper>
  );
}
