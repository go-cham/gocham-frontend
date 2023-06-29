import GrayProfileImg from '@/images/PostComponent/gray_profileImg.png';

interface PostUserProfileProps {
  nickname: string;
  profileImage?: string | null;
}

export default function PostUserProfile({
  nickname,
  profileImage,
}: PostUserProfileProps) {
  return (
    <div className="flex items-center space-x-[0.5rem]">
      <img
        src={profileImage || GrayProfileImg}
        alt="프로필"
        className="h-[2.5rem] w-[2.5rem] rounded-full"
      />
      <span className="text-[1.2rem]">{nickname || '익명'}</span>
    </div>
  );
}
