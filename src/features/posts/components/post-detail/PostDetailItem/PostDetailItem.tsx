import { useAtomValue } from 'jotai';
import Spacing from '@/common/components/ui/Spacing';
import PostDetailContent from '@/features/posts/components/post-detail/PostDetailItem/PostDetailContent';
import PostDetailFooter from '@/features/posts/components/post-detail/PostDetailItem/PostDetailFooter';
import PostDetailHeader from '@/features/posts/components/post-detail/PostDetailItem/PostDetailHeader';
import { Post } from '@/features/posts/types/post';
import VoteSection from '@/features/vote/components/VoteSection';
import useGetChoiceOptions from '@/features/vote/queries/useGetChoiceOptions';
import { selectedVoteOptionIdAtom } from '@/features/vote/states/selected-vote-option';

interface PostDetailProps {
  post: Post;
}

export default function PostDetailItem({ post }: PostDetailProps) {
  const selectedVoteOptionId = useAtomValue(selectedVoteOptionIdAtom);
  const { data: choiceOptions } = useGetChoiceOptions(post.id);

  const images = post.worryFiles.map((file) => file.url);
  const isSelected = choiceOptions?.find(
    (option) => option.id === selectedVoteOptionId,
  );

  return (
    <div
      className="flex flex-col px-[2.5rem] py-[1.3rem]"
      id={isSelected ? 'vote-selected' : ''}
    >
      <PostDetailHeader post={post} />
      <PostDetailContent
        title={post.title}
        content={post.content}
        images={images}
      />
      <Spacing size={'1.5rem'} />
      <VoteSection postId={post.id} expirationTime={post.expirationTime} />
      <PostDetailFooter post={post} />
    </div>
  );
}
