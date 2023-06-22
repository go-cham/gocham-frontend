import GrayProfileImg from '@/images/PostComponent/gray_profileImg.png';

const PostUserProfile = ({
  nickname,
  profileImage,
}: {
  nickname: string;
  profileImage?: string | null;
}) => {
  return (
    <div className="flex items-center space-x-2">
      <img
        src={profileImage || GrayProfileImg}
        alt="프로필"
        className="h-[2.5rem] w-[2.5rem] rounded-full"
      />
      <span className="text-[1.2rem]">{nickname || '익명'}</span>
    </div>
  );
};

export default PostUserProfile;
