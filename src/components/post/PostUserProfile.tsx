interface PostUserProfileProps {
  nickname: string;
  age: number;
}

export default function PostUserProfile({
  nickname,
  age,
}: PostUserProfileProps) {
  return (
    <div className="flex items-center space-x-[0.5rem]">
      <span className="flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full bg-custom-main-100 text-[1.2rem] font-bold tracking-[-0.36px] text-custom-main-500">
        {String(age)[0] + '0'}
      </span>
      <span className="text-body2">{nickname}</span>
    </div>
  );
}
