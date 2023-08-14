import PostLoadingIcon from '@/components/icons/PostLoadingIcon';

export default function PostUploading() {
  return (
    <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center">
      <PostLoadingIcon />
      <span className="absolute -bottom-[5.5rem] text-mainSub-mainPush-600 font-custom-heading2">
        고민 충전하는 중...
      </span>
    </div>
  );
}
