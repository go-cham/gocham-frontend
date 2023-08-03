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
    <div className="mx-[2.5rem] mb-[2.1rem] flex justify-between space-x-[1.2rem] overflow-hidden rounded-[2.35rem] bg-background-subBg-100">
      {['내 게시글', '참여한 게시글'].map((label) => {
        const selected =
          (postType === 'my' && label === '내 게시글') ||
          (postType === 'participating' && label === '참여한 게시글');
        return (
          <div
            key={label}
            className={`flex-1 cursor-pointer select-none py-[0.8rem] text-center font-system-body4 ${
              selected
                ? 'rounded-[2.35rem] bg-text-subTitle-700 text-white'
                : 'text-text-explain-500'
            }`}
            onClick={() => {
              const selectedType =
                label === '내 게시글' ? 'my' : 'participating';
              sessionStorage.setItem('selectMyPostTypeLabel', selectedType);
              switchPostType(label === '내 게시글' ? 'my' : 'participating');

              if (postType === selectedType) {
                const id = `${selectedType}-posts`;
                const el = document.getElementById(id);
                if (el) {
                  el.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                }
              }
            }}
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
