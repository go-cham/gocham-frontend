import { twJoin } from 'tailwind-merge';
import { ReactComponent as VoteResultCharacter } from './vote-result-character.svg';

interface PercentageBarProps {
  percentage: number;
  colored: boolean;
  accented: boolean;
  useAnimation: boolean;
  useCharacter: boolean;
}

export function PercentageBar({
  percentage,
  colored,
  accented,
  useAnimation,
  useCharacter,
}: PercentageBarProps) {
  return (
    <div className="relative h-[4px] w-full rounded-[5px] bg-background-voteBg-100">
      <div
        className={twJoin(
          `absolute left-0 top-0 h-full rounded-[5px] ${
            useAnimation && 'animate-slide-bar'
          }`,
          !colored &&
            (accented ? 'bg-text-subTitle-700' : 'bg-text-subExplain-400'),
          colored &&
            (accented ? 'bg-mainSub-main-500' : 'bg-mainSub-mainPush-200'),
        )}
        style={{
          width: percentage + '%',
        }}
      />
      {useAnimation && useCharacter && (
        <div
          className={'relative h-full w-full'}
          style={{ transform: `translateX(${percentage}%)` }}
        >
          <div
            className={`absolute h-full w-full ${
              useAnimation && 'animate-slide-character'
            }`}
            style={{
              width: percentage + '%',
              left: `calc(-${percentage}% - 2.9rem)`,
            }}
          >
            <VoteResultCharacter
              className={`absolute -top-[3.55rem] h-[4rem] w-[5.8rem] transition-opacity duration-200`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
