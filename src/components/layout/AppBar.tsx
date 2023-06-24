import { useNavigate } from 'react-router-dom';

import BackButton from '@/images/Common/back_button_42X42.svg';

const AppBar = ({
  title,
  boxShadow,
  background,
  navigateRoute,
  navigateAction,
}: {
  title?: string;
  boxShadow?: boolean;
  background?: string;
  navigateRoute?: string;
  navigateAction?: () => void;
}) => {
  const navigate = useNavigate();

  const handleClickBackButton = () => {
    if (navigateAction) {
      // navigateAction 이 있을경우
      navigateAction();
    } else {
      // navigateAction 이 없을 경우
      if (navigateRoute) {
        navigate(navigateRoute);
      } else {
        navigate(-1);
      }
    }
  };

  return (
    <header
      className="relative flex h-[4.5rem] items-center justify-center border-b border-[#eaeaeb] bg-background"
      style={{
        boxShadow: boxShadow ? '0 0 2.5rem rgba(42,45,55,0.1)' : undefined,
        backgroundColor: background,
      }}
    >
      <img
        src={BackButton}
        alt={'뒤로가기'}
        onClick={handleClickBackButton}
        className="absolute left-0"
      />
      {title && <h1 className="text-[1.6rem] font-bold">{title}</h1>}
    </header>
  );
};

export default AppBar;
