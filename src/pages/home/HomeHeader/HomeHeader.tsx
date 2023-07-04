import LogoAndTitle from '@/images/Common/LogoAndTitle.svg';

export default function HomeHeader() {
  return (
    <header className="bg-white py-[1.2rem] pl-[2.5rem]">
      <img src={LogoAndTitle} alt={'로고'} />
    </header>
  );
}
