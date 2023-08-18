import { AxiosError } from 'axios';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TopAppBar } from '@/common/components/layout';
import { Button } from '@/common/components/ui/buttons';
import { LoadingSpinner } from '@/common/components/ui/loading';
import { REPORT_COMMENT_REASON_OPTIONS } from '@/common/constants/options';
import { withAuth } from '@/features/auth/components/withAuth/withAuth';
import { useReportComment } from '@/features/report/queries';
import { useUser } from '@/features/user/queries/useUser';

function CommentReportPage() {
  const { id } = useParams();
  const { user } = useUser();
  const [selectedReasonId, setSelectedReasonId] = useState<number>();
  const { state } = useLocation();
  const {
    mutate: reportComment,
    isSuccess,
    error,
    isLoading,
  } = useReportComment();
  const navigate = useNavigate();

  const handleReasonChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedReasonId(+e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedReasonId) {
      return;
    }

    if (user) {
      reportComment({
        userId: user.id,
        worryReplyId: Number(id),
        reasonId: selectedReasonId,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      alert('신고가 정상적으로 접수되었습니다.');
      navigate(`/feed/${state.postId}/comment`);
    }
    if (error) {
      if (
        error instanceof AxiosError &&
        error.response?.data.errorCode === 'IS_DUPLICATED_WORRY_REPLY_REPORT'
      ) {
        alert('이미 신고한 게시글입니다.');
      } else {
        alert('오류가 발생하였습니다.');
      }
      navigate(`/feed/${state.postId}/comment`);
    }
  }, [isSuccess, error, navigate, state.postId]);

  return (
    <div className="flex h-full flex-col">
      {isLoading && (
        <div className="absolute left-1/2 top-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2">
          <LoadingSpinner />
        </div>
      )}
      <TopAppBar title="댓글 신고" />
      <div className="border-b border-background-dividerLine-300 px-[1.5rem] pb-[1.7rem] pt-[3.3rem]">
        <h1 className="text-text-title-900 font-system-heading1">
          댓글을 신고하는 사유를 선택해주세요.
        </h1>
        <div className="mt-[1.9rem]">
          <div>
            <span className="mr-[0.5rem] text-text-explain-500 font-system-body2">
              작성자
            </span>
            <span className="text-text-title-900 font-system-body2">
              {state.nickName}
            </span>
          </div>
          <div className="flex space-x-[1.3rem]">
            <span className="whitespace-nowrap text-text-explain-500 font-system-body2">
              내 용
            </span>
            <p className="text-text-title-900 font-system-body2">
              {state.content}
            </p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <fieldset className="flex flex-col px-[1.5rem] py-[0.2rem]">
          {REPORT_COMMENT_REASON_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="mt-[1.7rem] flex items-center space-x-[0.9rem] border-b border-background-dividerLine-300 pb-[1.5rem]"
            >
              <input
                type="radio"
                id={option.value + ''}
                name="report-options"
                value={option.value}
                className="h-[2.2rem] w-[2.2rem] appearance-none rounded-full border-white outline outline-1 outline-background-dividerLine-300 checked:border-[0.2rem] checked:bg-mainSub-main-500 focus:outline focus:outline-background-dividerLine-300"
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

export default withAuth(CommentReportPage, { block: 'unauthenticated' });
