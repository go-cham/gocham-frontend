import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { Suspense } from 'react';
import { BottomAppBar, PageWrapper } from '@/common/components/layout';
import { Divider, Spacing } from '@/common/components/ui';
import { POST_TYPE } from '@/common/constants/post-type';
import { usePullToRefresh } from '@/common/hooks/usePullToRefresh';
import { useScrollRestoration } from '@/common/hooks/useScrollRestoration';
import { useScrollToTop } from '@/common/hooks/useScrollToTop';
import { assignMultipleRefs } from '@/common/utils/dom/assign-multiple-refs';
import { withAuth } from '@/features/auth/components/withAuth/withAuth';
import { PostCardList } from '@/features/posts/components/PostCardList';
import { PostCardListSkeleton } from '@/features/posts/components/PostCardListSkeleton';
import { selectedPostTypeAtom } from '@/features/posts/states/selected-post-type';
import { PostTypeTabList } from '@/features/user/components/PostTypeTabList';
import { UserPageHeader } from '@/pages/user/components/UserPageHeader';

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
      <main className={'flex h-full min-h-0 w-full flex-col h-full'}>
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
          className={'hide-scrollbar h-full overflow-y-scroll px-[2.5rem]'}
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
