import DetailArrow from '@/images/Login/detail_arrow.png';

import Checkbox from './Checkbox';

interface TermCheckboxProps {
  text: string;
  checked: boolean;
  onCheck: (value: boolean) => void;
  link?: string;
}

export default function TermCheckbox({
  text,
  checked,
  onCheck,
  link,
}: TermCheckboxProps) {
  return (
    <div className="relative flex items-center">
      <Checkbox value={checked} setValue={onCheck} />
      <span className="ml-[1rem] text-[1.4rem] font-medium">{text}</span>
      {link && (
        <a href={link} className="absolute right-0">
          <img src={DetailArrow} alt={'약관 상세'} />
        </a>
      )}
    </div>
  );
}
