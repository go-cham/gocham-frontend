interface BannerProps {
  show: boolean;
  applyUpdate: () => void;
}

export default function Banner({ show, applyUpdate }: BannerProps) {
  if (!show) {
    return null;
  }

  return (
    <div className="absolute left-1/2 top-[8rem] z-[100] mx-auto flex h-[4rem] w-[30rem] -translate-x-1/2 items-center justify-between rounded-[6px] bg-black px-[1.5rem] py-[1rem]">
      <span className="text-[0.9em] text-white">
        새 버전으로 업데이트합니다.
      </span>
      <button
        className="cursor-pointer text-[0.9em] font-bold text-[rgb(249,160,160)] hover:text-[rgb(237,144,144)]"
        onClick={applyUpdate}
      >
        확인
      </button>
    </div>
  );
}
