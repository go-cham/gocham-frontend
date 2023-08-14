import { useSetAtom } from 'jotai';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import PostCardContent from '@/components/post/PostCard/PostCardContent';
import PostCardMeta from '@/components/post/PostCard/PostCardMeta';
import { Spacing } from '@/components/ui/Spacing';
import UserProfile from '@/components/user/UserProfile';
import { ADMIN_EMAIL } from '@/constants/admin';
import { POST_TYPE } from '@/constants/post-type';
import { scrollRestorationAtom } from '@/states/scroll-restoration';
import { Post } from '@/types/post';
import { calculateAgeFromBirthday } from '@/utils/date/calculateAge';

interface PostCardProps {
  post: Post;
  type: POST_TYPE;
}

export default function PostCard({ post, type }: PostCardProps) {
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
          age={calculateAgeFromBirthday(post.user.birthday)}
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
