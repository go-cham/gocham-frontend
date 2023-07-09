import { useAtom } from 'jotai';

import CheckIcon from '@/components/icons/CheckIcon';
import { twMergeCustom } from '@/libs/tw-merge';
import { selectedVoteOptionAtom } from '@/states/selectedVoteOption';

interface PostVoteProps {
  options?: { id: number; label: string }[];
}

export default function PostVote({ options }: PostVoteProps) {
  const [selectedVoteOption, setSelectedVoteOption] = useAtom(
    selectedVoteOptionAtom
  );

  const handleButtonSelect = (id: number) => {
    if (id === selectedVoteOption?.id) {
      setSelectedVoteOption(null);
    } else {
      setSelectedVoteOption({
        id,
        inView: true,
      });
    }
  };

  return (
    <section className="px-[2.5rem]">
      <div className="mt-[1.2rem] flex flex-col space-y-[1.2rem]">
        {options &&
          options.map((option) => (
            <button
              className={twMergeCustom(
                'relative flex h-[4.4rem] items-center overflow-hidden rounded-[0.5rem] border border-custom-background-200 text-start shadow-header',
                selectedVoteOption?.id === option.id &&
                  'bg-custom-background-100'
              )}
              key={option.id}
              onClick={() => handleButtonSelect(option.id)}
            >
              <CheckIcon
                color={
                  selectedVoteOption?.id === option.id ? '#222222' : '#757575'
                }
                className="ml-[0.9rem] mr-[0.7rem] h-[2.4rem] w-[2.4rem]"
              />
              <span
                className={`text-body4 ${
                  selectedVoteOption?.id === option.id
                    ? 'text-gray-900'
                    : 'text-custom-gray-600'
                }`}
              >
                {option.label}
              </span>
              {/* temp image*/}
              <img
                src="https://m.cooksomssi.co.kr/web/product/big/202207/aa3bd6db11d407657ac795fdf9c003b3.jpg"
                alt={option.label || ''}
                className="absolute right-0 aspect-square h-full"
              />
            </button>
          ))}
      </div>
      <div className="mt-[1.5rem] flex justify-between text-body2 text-custom-text-500">
        <button>결과만 볼래요</button>
        <button>현재 투표한 사용자 {0}명</button>
      </div>
    </section>
  );
}
