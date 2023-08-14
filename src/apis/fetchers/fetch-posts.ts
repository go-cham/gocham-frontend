import { GetPostsResponse } from '@/apis/dto/posts/get-posts';
import { axiosInstance } from '@/libs/axios';
import { Post } from '@/types/post';

interface fetchPostsArgs {
  authorId?: number | null;
  participatingUserId?: number | null;
  pageParam?: number | null;
}

export async function fetchPosts({
  authorId,
  participatingUserId,
  pageParam,
}: fetchPostsArgs) {
  const res = await axiosInstance.get<GetPostsResponse>('/worries', {
    params: {
      sort: 'DESC',
      take: 10,
      nextCursorId: pageParam,
      authorId,
      participatingUserId,
    },
  });

  const posts: Post[] = res.data.data.map((post) => ({
    id: post.id,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    title: post.title,
    content: post.content,
    expirationTime: post.expirationTime,
    worryFiles: post.worryFiles.filter((file) => file.status === 'activated'),
    replyCount: post.replyCount,
    userWorryChoiceCount: post.userWorryChoiceCount,
    user: {
      ...post.user,
      birthday: post.user.birthDate,
    },
  }));

  return {
    posts,
    nextId: res.data.meta.nextId,
    totalCount: res.data.meta.total,
  };
}
