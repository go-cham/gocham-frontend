import Age10Icon from '../icons/age/Age10Icon';
import Age20Icon from '../icons/age/Age20Icon';
import Age30Icon from '../icons/age/Age30Icon';
import Age40Icon from '../icons/age/Age40Icon';
import Age40PlusIcon from '../icons/age/Age40PlusIcon';

interface PostUserProfileProps {
  nickname: string;
  age: number;
  color?: 'primary' | 'gray';
}

export default function PostUserProfile({
  nickname,
  age,
  color = 'primary',
}: PostUserProfileProps) {
  return (
    <div className="flex items-center space-x-[0.5rem]">
      <span className="h-[2.5rem] w-[2.5rem] tracking-[-0.36px]">
        {age < 20 && <Age10Icon />}
        {age >= 20 && age < 30 && <Age20Icon />}
        {age >= 30 && age < 40 && <Age30Icon />}
        {age >= 40 && age < 50 && <Age40Icon />}
        {age >= 50 && <Age40PlusIcon />}
      </span>
      <span className="font-system-body2">{nickname}</span>
    </div>
  );
}
