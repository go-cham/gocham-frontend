import { useNavigate } from 'react-router-dom';

import PostCardContent from '@/components/post/PostCard/PostCardContent';
import PostCardMeta from '@/components/post/PostCard/PostCardMeta';
import PostUserProfile from '@/components/post/PostUserProfile';
import { RouteURL } from '@/constants/route-url';
import { Post } from '@/types/post';

interface PostCardProps {
  post: Post;
  routeUrl?: string;
  loggedIn: boolean;
  showProfile?: boolean;
}

export default function PostCard({
  post,
  routeUrl,
  loggedIn,
  showProfile = true,
}: PostCardProps) {
  const navigate = useNavigate();

  const handlePostClick = () => {
    if (routeUrl) {
      navigate(`${RouteURL.feed}/${post.id}/${routeUrl}`);
    } else {
      navigate(`${RouteURL.feed}/${post.id}`);
    }
  };

  const handleCommentsOpen = () => {
    if (!loggedIn) {
      navigate(RouteURL.login);
    } else {
      navigate(`/feed/${post.id}/comment`);
    }
  };

  return (
    <section className="flex w-full flex-col justify-between rounded-[12px] bg-white p-[1.7rem] shadow-feed">
      {showProfile && (
        <PostUserProfile
          nickname={post.user.nickname}
          age={22} // TODO
        />
      )}
      <PostCardContent
        title={post.title}
        content={post.content}
        image={post.worryFiles[0]?.url || null}
        onClick={handlePostClick}
      />
      <PostCardMeta
        numComment={post.replyCount}
        numVotes={post.userWorryChoiceCount}
        onClickComment={handleCommentsOpen}
      />
    </section>
  );
}
