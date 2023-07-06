import { useParams } from 'react-router-dom';

import useGetPost from '@/apis/hooks/posts/useGetPost';
import useUser from '@/apis/hooks/users/useUser';
import TopAppBar from '@/components/layout/TopAppBar';
import Button from '@/components/ui/buttons/Button';
import withAuth from '@/components/withAuth';
import { reportOptions } from '@/constants/Options';
import { RouteURL } from '@/constants/route-url';

import PostDetail from './PostDetail';

function FeedPage() {
  const { id } = useParams();
  const { user } = useUser();
  const { post } = useGetPost(id ? +id : undefined);

  if (!post || !user) {
    return null;
  }

  return (
    <div className="flex h-full flex-col">
      <TopAppBar title="게시물 신고" />
      <h1 className="mt-[3.3rem] border-b border-custom-background-200 pb-[3.5rem] pl-[1.5rem] text-heading2">
        ‘{post.title}’
        <br />
        게시물을 신고하는 사유를 선택해주세요.
      </h1>
      <fieldset className="flex flex-col px-[1.5rem] py-[0.2rem]">
        {reportOptions.map((option) => (
          <label
            key={option.value}
            className="mt-[1.7rem] flex items-center space-x-[0.9rem] border-b pb-[1.5rem]"
          >
            <input
              type="radio"
              id={option.value + ''}
              name="report-options"
              value={option.value}
              className="h-[2.2rem] w-[2.2rem] appearance-none rounded-full border-white outline outline-custom-background-200 checked:border-[0.2rem] checked:bg-custom-main-500 focus:outline focus:outline-custom-background-200"
            />
            <span className="text-body3">{option.label}</span>
          </label>
        ))}
      </fieldset>
      <Button className="absolute bottom-[4.8rem] left-1/2 -translate-x-1/2 ">
        신고하기
      </Button>
    </div>
  );
}

export default withAuth(FeedPage, { block: 'unauthenticated' });
