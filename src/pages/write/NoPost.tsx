import { useNavigate } from 'react-router-dom';
import myPageNoneIcon from '@/common/assets/images/home/logo-mypagenone.svg';

interface NoPostText {
  text: string;
  textLink?: string;
}

export default function NoPost({ text, textLink }: NoPostText) {
  const navigate = useNavigate();
  const toWritePage = () => {
    navigate('/write');
  };
  return (
    <div className="flex h-full items-center justify-center">
      <div className="mb-[8rem] flex flex-col items-center">
        <img
          src={myPageNoneIcon}
          alt={'마이페이지 로고'}
          className={`h-[7.512rem] w-[7.496rem]`}
        />
        <span className="pb-[0.2rem] pt-[1.2rem] font-system-body3">
          {text}
        </span>
        <span
          onClick={toWritePage}
          className="cursor-pointer text-mainSub-main-500 underline font-system-body4"
        >
          {textLink}
        </span>
      </div>
    </div>
  );
}
