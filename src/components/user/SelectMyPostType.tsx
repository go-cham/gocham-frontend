import { PostType } from '@/pages/user/UserPage';

interface SelectMyPostTypeProps {
  postType: PostType;
  switchPostType: (postType: PostType) => void;
  postingCount: { written: number; participated: number };
}

export default function SelectMyPostType({
  postType,
  switchPostType,
  postingCount,
}: SelectMyPostTypeProps) {
  return (
    <div className="mx-[2.5rem] mb-[2.1rem] flex justify-between space-x-[1.2rem] overflow-hidden rounded-[2.35rem] bg-custom-background-100">
      {['내 게시글', '참여한 게시글'].map((label) => {
        const selected =
          (postType === 'my' && label === '내 게시글') ||
          (postType === 'participating' && label === '참여한 게시글');
        return (
          <div
            key={label}
            className={`flex-1 py-[0.8rem] text-center text-body4 ${
              selected
                ? 'rounded-[2.35rem] bg-custom-gray-800 text-white'
                : 'text-custom-text-400'
            }`}
            onClick={() =>
              switchPostType(label === '내 게시글' ? 'my' : 'participating')
            }
          >
            {`${label} ${
              label === '내 게시글'
                ? postingCount.written
                : postingCount.participated
            }`}
          </div>
        );
      })}
    </div>
  );
}
