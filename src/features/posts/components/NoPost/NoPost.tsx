import { useNavigate } from 'react-router-dom';
import { POST_TYPE } from '@/common/constants/post-type';
import { ReactComponent as NoPostIcon } from './no-post-icon.svg';

interface NoPostText {
  type: POST_TYPE;
}

export function NoPost({ type }: NoPostText) {
  const navigate = useNavigate();

  const text =
    type === POST_TYPE.MY
      ? '아직 작성한 게시물이 없어요.'
      : '투표하거나 댓글 남긴 게시글이 없어요.';

  return (
    <div
      className={
        'absolute left-1/2 top-[45%] flex -translate-x-1/2 flex-col items-center'
      }
    >
      <NoPostIcon className={'h-[7.512rem] w-[7.496rem]'} />
      <span className="mt-[1.688rem] font-system-body3">{text}</span>
      {type === POST_TYPE.MY && (
        <span
          className="cursor-pointer text-mainSub-main-500 underline font-system-body4"
          onClick={() => navigate('/write')}
        >
          글 작성 시작
        </span>
      )}
    </div>
  );
}
