import LogoAndTitle from '@/images/Common/LogoAndTitle.svg';

export default function HomeHeader() {
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
    <header className="h-[6.3rem] py-[1.2rem] pl-[2.5rem]">
      <img
        src={LogoAndTitle}
        alt={'로고'}
        onClick={handleTitleClick}
        className="cursor-pointer"
      />
    </header>
  );
}
