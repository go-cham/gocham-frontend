import { useAtomValue } from 'jotai';

import LogoFull from '@/images/Common/HomeLogoFull.svg';
import LogoFullState from '@/images/Common/HomeLogoFullState.svg';
import LogoStarve from '@/images/Common/HomeLogoStarve.svg';
import LogoStarveState from '@/images/Common/HomeLogoStarveState.svg';
import { hasUploadedPost } from '@/pages/write/WritePage';

export default function HomeHeader() {
  const hasUploaded = useAtomValue(hasUploadedPost);
  const handleTitleClick = () => {
    const list = document.querySelector('#home-post-list');
    if (list) {
      list.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="flex h-[8rem] py-[1.2rem] pl-[2.5rem]">
      {!hasUploaded ? (
        <>
          <img
            src={LogoStarve}
            alt={'배고픈로고'}
            onClick={handleTitleClick}
            className="cursor-pointer"
          />
          <img src={LogoStarveState} alt={'배고픈상태'} />
        </>
      ) : (
        <>
          <img
            src={LogoFull}
            alt={'배부른로고'}
            onClick={handleTitleClick}
            className="cursor-pointer"
          />
          <img src={LogoFullState} alt={'배부른상태'} />
        </>
      )}
    </header>
  );
}
