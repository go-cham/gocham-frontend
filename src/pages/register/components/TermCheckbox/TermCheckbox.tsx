import DetailArrow from '@/common/assets/images/Login/detail_arrow.png';
import { Checkbox } from '@/common/components/ui/selections';

interface TermCheckboxProps {
  text: string;
  checked: boolean;
  onCheck: (checked: boolean) => void;
  link?: string;
}

export function TermCheckbox({
  text,
  checked,
  onCheck,
  link,
}: TermCheckboxProps) {
  return (
    <div className="relative flex items-center">
      <Checkbox id={text} checked={checked} onChange={onCheck} />
      <span className="ml-[1rem] font-system-body4">{text}</span>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="absolute right-0"
        >
          <img src={DetailArrow} alt={'약관 상세'} />
        </a>
      )}
    </div>
  );
}
