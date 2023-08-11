import logoChargedImage from '@/images/home/logo-charged.svg';
import logoDischargedImage from '@/images/home/logo-discharged.svg';

interface HeaderLogoProps {
  charged: boolean;
  onClick: () => void;
}
export default function HeaderLogo({ charged, onClick }: HeaderLogoProps) {
  return (
    <button onClick={onClick}>
      <img
        src={logoChargedImage}
        alt={'로고'}
        className={`${!charged && 'hidden'}`}
      />
      <img
        src={logoDischargedImage}
        alt={'로고'}
        className={`${charged && 'hidden'}`}
      />
    </button>
  );
}
