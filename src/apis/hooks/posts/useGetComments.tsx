import { useQuery } from '@tanstack/react-query';

import { GetCommentsResponse } from '@/apis/dto/posts/get-comments';
import { axiosInstance } from '@/libs/axios';
import { Comment } from '@/types/comment';

async function getComments(postId: number) {
  const res = await axiosInstance.get<GetCommentsResponse>('/worry-replies', {
    params: {
      worryId: postId,
    },
  });
  return res.data;
}

export default function useGetComments(postId: number) {
  const { data, ...queryInfo } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getComments(postId),
  });

  const comments: Comment[] | null = data
    ? data.map(({ id, createdAt, content, user, childReplies }) => ({
        id,
        createdAt,
        content,
        user: {
          id: user.id,
          email: user.email,
          nickname: user.nickname,
          profileImage: user.profileImageUrl,
          birthDate: user.birthDate,
          choice: user.worryChoice
            ? {
                id: user.worryChoice.id,
                label: user.worryChoice.label,
                isAbstained: user.worryChoice.isAbstained === 'yes',
              }
            : null,
        },
        replies: childReplies.map(
          ({ id, createdAt, content, mentionUser, user }) => ({
            id,
            createdAt,
            content,
            to: {
              id: mentionUser.id,
              nickname: mentionUser.nickname,
            },
            user: {
              id: user.id,
              email: user.email,
              profileImage: user.profileImageUrl,
              nickname: user.nickname,
              birthDate: user.birthDate,
            },
          }),
        ),
      }))
    : null;

  return {
    ...queryInfo,
    data: comments,
  };
}
