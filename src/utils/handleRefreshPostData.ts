import { Post } from '@/types/post';

export const handleRefreshPostData = (
  thisPostData: Post,
  updateObject: string
): Post => {
  //
  if (updateObject === 'chat') {
    return Object.assign({}, thisPostData, {
      replyCount: thisPostData.replyCount + 1,
    });
  } else if (updateObject === 'vote') {
    return Object.assign({}, thisPostData, {
      userWorryChoiceCount: thisPostData.userWorryChoiceCount + 1,
    });
  }
  return thisPostData;
};
