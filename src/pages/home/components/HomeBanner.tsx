import { isMobile } from 'react-device-detect';
import homeBannerImage from '@/common/assets/images/home/home-banner.svg';

export default function HomeBanner() {
  return (
    <a
      href={
        isMobile
          ? 'https://sharechang.notion.site/GoCham-5d4be861d6ad46ca89849315c7a6be2c?pvs=4' // 다크모드
          : 'https://sharechang.notion.site/GoCham-0bc7fb112eb74df7af8484ef0bda85ca?pvs=4' // 라이트모드
      }
      target="_blank"
      rel="noreferrer"
    >
      <img src={homeBannerImage} alt="홈 배너" className="w-full" />
    </a>
  );
}
