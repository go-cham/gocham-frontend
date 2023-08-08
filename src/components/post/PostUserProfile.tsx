interface PostUserProfileProps {
  image?: string | null;
  nickname: string;
  age: number;
}

export default function PostUserProfile({
  image,
  nickname,
  age,
}: PostUserProfileProps) {
  return (
    <div className="flex items-center space-x-[0.5rem]">
      {image ? (
        <img
          src={image}
          alt="관리자 계정 이미지"
          className="h-[2.5rem] w-[2.5rem] rounded-full"
        />
      ) : (
        <span
          className="flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full bg-[#f4f4f5] text-[#b0b2b8] font-system-body1"
          style={{ fontWeight: 'bold' }}
        >
          {String(age)[0] + '0'}
        </span>
      )}
      <span className="font-system-body2">{nickname}</span>
    </div>
  );
}
