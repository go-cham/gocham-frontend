import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { Suspense } from 'react';

import BottomAppBar from '@/components/layout/BottomAppBar/BottomAppBar';
import Divider from '@/components/ui/Divider';
import PageWrapper from '@/components/ui/PageWrapper';
import { Spacing } from '@/components/ui/Spacing';
import PostTypeTabList from '@/components/user/PostTypeTabList';
import withAuth from '@/components/withAuth';
import { POST_TYPE } from '@/constants/post-type';
import usePullToRefresh from '@/hooks/usePullToRefresh';
import useScrollRestoration from '@/hooks/useScrollRestoration';
import useScrollToTop from '@/hooks/useScrollToTop';
import PostCardList from '@/pages/home/components/PostCardList';
import PostCardListSkeleton from '@/pages/home/components/PostCardListSkeleton';
import UserPageHeader from '@/pages/user/components/UserPageHeader';
import { selectedPostTypeAtom } from '@/states/selected-post-type';
import { assignMultipleRefs } from '@/utils/dom/assign-multiple-refs';

function UserPage() {
  const queryClient = useQueryClient();
  const [selectedPostType, setSelectedPostType] = useAtom(selectedPostTypeAtom);
  const { ref: scrollToTopRef, scrollToTop } = useScrollToTop<HTMLDivElement>();
  const pullToRefreshRef = usePullToRefresh<HTMLDivElement>({
    onRefresh: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts', { type: selectedPostType }],
      });
    },
  });
  const myPostsRef = useScrollRestoration<HTMLDivElement>('my-posts');
  const participatedPostsRef =
    useScrollRestoration<HTMLDivElement>('participated-posts');

  const handlePostTypeSelect = (postType: POST_TYPE) => {
    setSelectedPostType(postType);

    if (postType === selectedPostType) {
      scrollToTop();
    }
  };

  return (
    <PageWrapper>
      <UserPageHeader />
      <Divider className={'my-[1.9rem]'} />
      <main className={'flex min-h-0 w-full flex-col'}>
        <Suspense fallback={'fuck'}>
          <PostTypeTabList
            selectedPostType={selectedPostType}
            onSelect={handlePostTypeSelect}
          />
        </Suspense>
        <Spacing size={'2.1rem'} />
        <div
          id={selectedPostType}
          key={selectedPostType}
          ref={(el) =>
            assignMultipleRefs(el, [
              scrollToTopRef,
              pullToRefreshRef,
              selectedPostType === POST_TYPE.MY
                ? myPostsRef
                : participatedPostsRef,
            ])
          }
          className={'hide-scrollbar overflow-y-scroll px-[2.5rem]'}
        >
          <Suspense fallback={<PostCardListSkeleton />}>
            <PostCardList type={selectedPostType} />
            <Spacing size={'12rem'} />
          </Suspense>
        </div>
      </main>
      <BottomAppBar />
    </PageWrapper>
  );
}

export default withAuth(UserPage, { block: 'unauthenticated' });
