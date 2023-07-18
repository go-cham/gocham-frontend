import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import useGetPost from '@/apis/hooks/posts/useGetPost';
import userReportComment from '@/apis/hooks/posts/useReportComment';
import useReportPost from '@/apis/hooks/posts/useReportPost';
import useUser from '@/apis/hooks/users/useUser';
import TopAppBar from '@/components/layout/TopAppBar';
import Button from '@/components/ui/buttons/Button';
import withAuth from '@/components/withAuth';
import { reportOptions } from '@/constants/Options';
import { RouteURL } from '@/constants/route-url';

function CommentPage() {
  const { id } = useParams();
  const { user } = useUser();
  const [selectedReasonId, setSelectedReasonId] = useState<number>();
  const { state } = useLocation();
  const { reportComment, data, isLoading, isSuccess, error } =
    userReportComment();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      alert('신고가 정상적으로 접수되었습니다.');
      navigate(`/feed/${state.postId}/comment`);
    }
    if (error) {
      alert('오류가 발생하였습니다.');
      navigate(`/feed/${state.postId}/comment`);
    }
  }, [isSuccess, error]);

  if (!id || !user) {
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

    reportComment({
      userId: user.id,
      worryReplyId: Number(id),
      reasonId: selectedReasonId,
    });
  };

  return (
    <div className="flex h-full flex-col">
      <TopAppBar title="댓글 신고" />
      <h1 className="mt-[3.3rem] border-custom-background-200 pb-[2rem] pl-[1.5rem] text-heading2">
        댓글을 신고하는 사유를 선택해주세요.
      </h1>
      <div className="pl-[1.5rem]">
        <div>
          <span className="mr-[0.6rem] text-body2 text-custom-text-500">
            작성자
          </span>
          <span className="text-body2 text-custom-text-900">
            {state.nickName}
          </span>
        </div>
        <div>
          <span className="mr-[1.2rem] text-body2 text-custom-text-500">
            내 용
          </span>
          <span className="text-body2 text-custom-text-900">
            {state.content}
          </span>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
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
                onChange={handleReasonChange}
              />
              <span className="text-body3">{option.label}</span>
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

export default withAuth(CommentPage, { block: 'unauthenticated' });
