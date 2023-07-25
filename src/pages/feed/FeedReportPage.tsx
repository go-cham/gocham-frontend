import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useGetPost from '@/apis/hooks/posts/useGetPost';
import useReportPost from '@/apis/hooks/posts/useReportPost';
import useUser from '@/apis/hooks/users/useUser';
import TopAppBar from '@/components/layout/TopAppBar';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Button from '@/components/ui/buttons/Button';
import withAuth from '@/components/withAuth';
import { reportOptions } from '@/constants/Options';
import { RouteURL } from '@/constants/route-url';

function FeedPage() {
  const { id } = useParams();
  const { user } = useUser();
  const { post } = useGetPost(id ? +id : undefined);
  const [selectedReasonId, setSelectedReasonId] = useState<number>();
  const { reportPost, error, isSuccess, isLoading } = useReportPost();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      alert('신고가 정상적으로 접수되었습니다.');
      navigate(RouteURL.feed);
    }
    if (error) {
      alert('오류가 발생하였습니다.');
    }
  }, [isSuccess, error]);

  if (!post || !user) {
    return null;
  }

  const handleReasonChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedReasonId(+e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedReasonId) {
      return;
    }

    reportPost({
      userId: user.id,
      worryId: post.id,
      reasonId: selectedReasonId,
    });
  };

  return (
    <div className="flex h-full flex-col">
      {isLoading && (
        <div className="absolute left-1/2 top-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2">
          <LoadingSpinner />
        </div>
      )}
      <TopAppBar title="게시물 신고" />
      <h1 className="mt-[3.3rem] border-b border-background-dividerLine-300 pb-[3.5rem] pl-[1.5rem] font-system-heading1">
        ‘{post.title}’
        <br />
        게시물을 신고하는 사유를 선택해주세요.
      </h1>
      <form onSubmit={handleSubmit}>
        <fieldset className="flex flex-col px-[1.5rem] py-[0.2rem]">
          {reportOptions.map((option) => (
            <label
              key={option.value}
              className="mt-[1.7rem] flex items-center space-x-[0.9rem] border-b border-background-dividerLine-300 pb-[1.5rem]"
            >
              <input
                type="radio"
                id={option.value + ''}
                name="report-options"
                value={option.value}
                className="h-[2.2rem] w-[2.2rem] appearance-none rounded-full border-white outline outline-background-dividerLine-300 checked:border-[0.2rem] checked:bg-mainSub-main-500 focus:outline focus:outline-background-dividerLine-300"
                onChange={handleReasonChange}
              />
              <span className="font-system-body3">{option.label}</span>
            </label>
          ))}
        </fieldset>
        <Button
          className="absolute bottom-[4.8rem] left-1/2 -translate-x-1/2 "
          disabled={!selectedReasonId}
        >
          신고하기
        </Button>
      </form>
    </div>
  );
}

export default withAuth(FeedPage, { block: 'unauthenticated' });
