import { useNavigate } from 'react-router-dom';

import BackIcon from '@/components/icons/BackIcon';

interface TopAppBarProps {
  title?: string;
  boxShadow?: boolean;
  background?: string;
  navigateRoute?: string;
  navigateAction?: () => void;
}

export default function TopAppBar({
  title,
  boxShadow,
  background,
  navigateRoute,
  navigateAction,
}: TopAppBarProps) {
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
    <header className="relative flex h-[4.4rem] items-center justify-center bg-white shadow-header">
      <BackIcon
        className="absolute left-[0.9rem] h-full cursor-pointer"
        onClick={handleClickBackButton}
      />
      {title && <h1 className="text-heading3">{title}</h1>}
    </header>
  );
}
