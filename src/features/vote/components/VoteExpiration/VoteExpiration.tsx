import ClockIcon from './ClockIcon';

interface VoteExpirationProps {
  remainingTime: string;
}

export default function VoteExpiration({ remainingTime }: VoteExpirationProps) {
  const isClosed = remainingTime === 'closed';

  return (
    <div className="flex items-center space-x-[5.67px]">
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
