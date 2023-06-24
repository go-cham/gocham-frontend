import DetailArrow from '@/images/Login/detail_arrow.png';

import CheckBox from './CheckBox';

export default function TermCheckBox({
  text,
  checked,
  onCheck,
  link,
}: {
  text: string;
  checked: boolean;
  onCheck: (value: boolean) => void;
  link?: string;
}) {
  return (
    <div className="relative flex items-center">
      <CheckBox value={checked} setValue={onCheck} />
      <span className="ml-[1rem] text-[1.4rem] font-medium">{text}</span>
      {link && (
        <a href={link} className="absolute right-0">
          <img src={DetailArrow} alt={'약관 상세'} />
        </a>
      )}
    </div>
  );
}
