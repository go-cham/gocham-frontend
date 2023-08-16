import { useSetAtom } from 'jotai';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { Spacing } from '@/common/components/ui';
import { ADMIN_EMAIL } from '@/common/constants/admin';
import { POST_TYPE } from '@/common/constants/post-type';
import { scrollRestorationAtom } from '@/common/states/scroll-restoration';
import { Post } from '@/common/types/post';
import { calculateAgeFromBirthDate } from '@/common/utils/date/calculateAge';
import { UserProfile } from '@/features/user/components/UserProfile';

import { PostCardContent } from './PostCardContent';
import { PostCardMeta } from './PostCardMeta';

interface PostCardProps {
  post: Post;
  type: POST_TYPE;
}

export function PostCard({ post, type }: PostCardProps) {
  const navigate = useNavigate();
  const setScrollRestoration = useSetAtom(scrollRestorationAtom);

  const handlePostClick = () => {
    setScrollRestoration((prevScrollRestoration) => ({
      ...prevScrollRestoration,
      feed: 0,
    }));

    if (type === POST_TYPE.ALL) {
      navigate(`/feed/${post.id}`);
    } else {
      navigate(`/feed/${post.id}/${type}`);
    }
  };

  const handleCommentShow = (e: MouseEvent) => {
    e.stopPropagation();
    navigate(`/feed/${post.id}/comment`);
  };

  return (
    <div
      className="flex w-full cursor-pointer flex-col justify-between rounded-[12px] bg-white px-[1.7rem] py-[1.3rem] shadow-feed"
      onClick={handlePostClick}
    >
      {type !== POST_TYPE.MY && (
        <UserProfile
          nickname={post.user.nickname}
          age={calculateAgeFromBirthDate(post.user.birthDate)}
          isAdmin={post.user.email === ADMIN_EMAIL}
        />
      )}
      <PostCardContent
        title={post.title}
        content={post.content}
        image={post.worryFiles[0]?.url || null}
      />
      <Spacing size={'0.7rem'} />
      <PostCardMeta
        numComment={post.replyCount}
        numVotes={post.userWorryChoiceCount}
        onCommentShow={handleCommentShow}
      />
    </div>
  );
}
