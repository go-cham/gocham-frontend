import { useAtomValue } from 'jotai';

import LogoFull from '@/images/Common/HomeLogoFull.svg';
import LogoStarve from '@/images/Common/HomeLogoStarve.svg';
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
    <header className="flex items-center py-[1.2rem] pl-[2.5rem]">
      {!hasUploaded ? (
        <>
          <img src={LogoStarve} alt={'배고픈로고'} onClick={handleTitleClick} />
          <div
            className="ml-[1.5rem] rounded-lg pb-[0.7rem] pl-[1.1rem] pr-[1.7rem] pt-[0.6rem] shadow-dropdown font-custom-subheading"
            style={{
              fontWeight: 400,
            }}
          >
            고민을 작성해서 고민이에게 힘을 주세요!
          </div>
        </>
      ) : (
        <>
          <img src={LogoFull} alt={'배부른로고'} onClick={handleTitleClick} />
          <div
            className="ml-[1.5rem] rounded-lg pb-[0.7rem] pl-[1.1rem] pr-[1.7rem] pt-[0.6rem] shadow-dropdown font-custom-subheading"
            style={{
              fontWeight: 400,
            }}
          >
            오늘도 고민 충전 완료!
          </div>
        </>
      )}
    </header>
  );
}
