import { postDataType } from '@/types/postDataType';

export const handleRefreshPostData = (
  thisPostData: postDataType,
  updateObject: string
): postDataType => {
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

  // 아래코드로하면 오류남.
  // ApiConfig.request({
  //   method: HttpMethod.GET,
  //   url: EndPoint.worry.get.WORRIES_ID,
  //   path: {
  //     id: postData.id,
  //   },
  // })?.then(async (res) => {
  //   console.log(res.data);
  //   // @ts-ignore
  //   setThisPostData( res.data });
  // });
};
