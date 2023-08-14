import PostCompleteIcon from '@/components/icons/PostCompleteIcon';

export default function PostUploadSuccess() {
  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
      <PostCompleteIcon />
      <span className="absolute -bottom-[1.7rem] text-mainSub-mainPush-600 font-custom-heading2">
        고민 충전 완료 !
      </span>
    </div>
  );
}
