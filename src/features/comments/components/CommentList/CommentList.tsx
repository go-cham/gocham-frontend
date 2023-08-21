import { useEffect, useState } from 'react';
import { calculateAgeFromBirthDate } from '@/common/utils/date/calculateAge';
import { CommentItem } from '@/features/comments/components/CommentItem';
import { Comment } from '@/features/comments/types';

interface CommentListProps {
  writerId: number;
  comments: Comment[];
}

export function CommentList({ writerId, comments }: CommentListProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col divide-y-[1px] divide-background-dividerLine-300">
      {comments &&
        comments.map((comment) => (
          <div key={comment.id}>
            <CommentItem
              user={{
                id: comment.user.id,
                profileImage: comment.user.profileImage,
                email: comment.user.email,
                nickname: comment.user.nickname,
                age: calculateAgeFromBirthDate(comment.user.birthDate),
                choiceLabel: comment.user.choice?.label || null,
              }}
              isWriter={writerId === comment.user.id}
              content={comment.content}
              commentId={comment.id}
              createdAt={comment.createdAt}
              scrollEnabled={mounted}
            />
            <div>
              {comment.replies.map((reply) => (
                <div key={reply.id} className="ml-[2.4rem]">
                  <CommentItem
                    user={{
                      id: reply.user.id,
                      profileImage: reply.user.profileImage,
                      email: reply.user.email,
                      nickname: reply.user.nickname,
                      age: calculateAgeFromBirthDate(reply.user.birthDate),
                      choiceLabel: null, // TODO: api 응답 변경
                    }}
                    isWriter={writerId === reply.user.id}
                    content={reply.content}
                    createdAt={reply.createdAt}
                    mentionNickname={reply.to.nickname}
                    commentId={reply.id}
                    parentCommentId={comment.id}
                    scrollEnabled={mounted}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
