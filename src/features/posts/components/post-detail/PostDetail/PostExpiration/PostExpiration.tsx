import ClockIcon from './ClockIcon';

export function PostExpiration({ remainingTime }: { remainingTime: string }) {
  const isClosed = remainingTime === 'closed';

  return (
    <div className="mt-[1.5rem] flex items-center space-x-[5.67px] px-[2.5rem]">
      <ClockIcon colored={!isClosed} />
      {isClosed ? (
        <span className="text-text-explain-500 font-system-body2">
          투표가 마감되었어요
        </span>
      ) : (
        <span className="text-mainSub-main-500 font-system-body2">
          {remainingTime}
        </span>
      )}
    </div>
  );
}
