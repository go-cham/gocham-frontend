import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/common/libs/axios';
import { GetCommentsResponse } from '@/features/comments/queries/dto/get-comments';
import { useUser } from '@/features/user/queries';
import { AddCommentRequest, AddCommentResponse } from './dto/add-comment';

async function addComment(data: AddCommentRequest) {
  const res = await axiosInstance.post<AddCommentResponse>('/worry-reply', {
    ...data,
    mentionUserNickname: undefined,
  });
  return res.data;
}

export function useAddComment(postId: number) {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addComment,
    onMutate: async (data) => {
      // Optimistic update (https://tanstack.com/query/latest/docs/react/guides/optimistic-updates)
      await queryClient.cancelQueries(['comments', { postId }]);
      const previousComments = queryClient.getQueryData([
        'comments',
        { postId },
      ]);
      queryClient.setQueryData<GetCommentsResponse>(
        ['comments', { postId }],
        (prevComments) => {
          if (!user || !prevComments) {
            return prevComments;
          }

          const now = new Date();
          now.setHours(now.getHours() + 9);

          if (data.mentionUserId) {
            const newComments = [...prevComments];
            newComments.forEach((comment) => {
              if (comment.id === data.nestingReplyId) {
                if (!comment.childReplies) {
                  comment.childReplies = [];
                }
                comment.childReplies.push({
                  id: -1,
                  createdAt: now.toString(),
                  content: data.content,
                  user: {
                    id: user.id,
                    nickname: user.nickname,
                    email: user.email,
                    birthDate: user.birthDate,
                    phoneNumber: null,
                    profileImageUrl: user.image,
                    worryChoice: null,
                  },
                  mentionUser: {
                    id: data.mentionUserId || -1,
                    email: '',
                    nickname: data.mentionUserNickname || '',
                    phoneNumber: null,
                    profileImageUrl: null,
                  },
                  updatedAt: now.toString(),
                });
              }
            });
            return newComments;
          } else {
            return [
              ...prevComments,
              {
                id: -1,
                user: {
                  id: user.id,
                  email: user.email,
                  nickname: user.nickname,
                  birthDate: user.birthDate,
                  phoneNumber: null,
                  profileImageUrl: user.image,
                  worryChoice: null,
                },
                content: data.content,
                childReplies: [],
                createdAt: now.toString(),
                updatedAt: now.toString(),
                status: 'activated',
              },
            ];
          }
        },
      );
      return { previousComments };
    },
    onError: (err, newComment, context) => {
      context &&
        queryClient.setQueryData(
          ['comments', { postId }],
          context.previousComments,
        );
    },
    onSettled: () => {
      queryClient.invalidateQueries(['comments', { postId }]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
    },
  });
}
