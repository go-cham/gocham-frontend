import LogoAndTitle from '@/images/Common/LogoAndTitle.svg';

export default function HomeHeader() {
  return (
    <header className="border-b border-gray3 bg-white py-[2rem] pl-[3rem] drop-shadow-[0_0_4px_rgba(42,45,55,0.1)]">
      <img src={LogoAndTitle} alt={'로고'} />
    </header>
  );
}
