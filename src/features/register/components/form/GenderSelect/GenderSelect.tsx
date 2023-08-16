import { useEffect, useState } from 'react';

import { Gender } from '@/common/types/user';

interface GenderSelectProps {
  defaultValue: Gender | null;
  onChange: (gender: Gender) => void;
}

export function GenderSelect({ defaultValue, onChange }: GenderSelectProps) {
  const [gender, setGender] = useState<Gender | null>(defaultValue);

  const handleClick = (selected: Gender) => () => {
    setGender(selected);
  };

  useEffect(() => {
    if (gender) {
      onChange(gender);
    }
  }, [gender]);

  return (
    <div>
      <span className="font-custom-body1">성별</span>
      <div className="mt-[0.7rem] flex justify-between">
        {(['male', 'female'] as const).map((currentGender) => (
          <button
            key={currentGender}
            type="button"
            className={`h-[3.9rem] w-[48%] rounded-[0.5rem] border-[1px] font-system-body4 ${
              gender === currentGender
                ? 'border-mainSub-mainPush-200 bg-mainSub-main-100 text-mainSub-main-500'
                : 'border-background-dividerLine-300 bg-white text-text-explain-500'
            }`}
            onClick={handleClick(currentGender)}
          >
            {currentGender === 'male' ? '남자' : '여자'}
          </button>
        ))}
      </div>
    </div>
  );
}
