import { AxiosError } from 'axios';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TopAppBar } from '@/common/components/layout';
import { Button } from '@/common/components/ui/buttons';
import { LoadingSpinner } from '@/common/components/ui/loading';
import { REPORT_FEED_REASON_OPTIONS } from '@/common/constants/options';
import { useGetPost } from '@/features/posts/queries';
import { useReportPost } from '@/features/report/queries';
import { useUser } from '@/features/user/queries/useUser';

export default function FeedPage() {
  const { id } = useParams();
  const { user } = useUser();
  const { data: post } = useGetPost(Number(id));
  const [selectedReasonId, setSelectedReasonId] = useState<number>();
  const { mutate: reportPost, error, isSuccess, isLoading } = useReportPost();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      alert('신고가 정상적으로 접수되었습니다.');
      navigate('/feed');
    }
    if (error) {
      if (
        error instanceof AxiosError &&
        error.response?.data.errorCode === 'IS_DUPLICATED_WORRY_REPORT'
      ) {
        return alert('이미 신고한 게시글입니다.');
      }

      return alert('오류가 발생하였습니다.');
    }
  }, [isSuccess, error, navigate]);

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
          {REPORT_FEED_REASON_OPTIONS.map((option) => (
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
