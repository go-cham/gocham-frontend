import CommentItem from '@/pages/comment/CommentItem';
import { Comment } from '@/types/comment';
import { calculateAgeFromBirthday } from '@/utils/date/calculateAge';

interface CommentListProps {
  writerId: number;
  comments: Comment[];
}

export default function CommentList({ writerId, comments }: CommentListProps) {
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
                age: calculateAgeFromBirthday(comment.user.birthday),
                choiceLabel: comment.user.choice?.label || null,
              }}
              isWriter={writerId === comment.user.id}
              content={comment.content}
              commentId={comment.id}
              createdAt={comment.createdAt}
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
                      age: calculateAgeFromBirthday(reply.user.birthday),
                      choiceLabel: null, // TODO: api 응답 변경
                    }}
                    isWriter={writerId === reply.user.id}
                    content={reply.content}
                    createdAt={reply.createdAt}
                    mentionNickname={reply.to.nickname}
                    commentId={reply.id}
                    parentCommentId={comment.id}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
