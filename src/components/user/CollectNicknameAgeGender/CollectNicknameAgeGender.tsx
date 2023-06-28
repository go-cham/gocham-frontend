import { UserInformationPropsType, userInformationType } from '@/types/user';

import BirthdateForm from './BirthDateForm';
import NicknameForm from './NicknameForm';

const CollectNicknameAgeGender = ({
  userInformation,
  setUserInformation,
}: UserInformationPropsType) => {
  const handleSelectGender = (sex: string) => {
    setUserInformation((value: userInformationType) => ({
      ...value,
      sex,
    }));
  };

  //생년월일 관련
  const handleBirthDateInputChange = (
    year: string,
    month: string,
    day: string
  ) => {
    // 입력값을 이용한 로직 처리
    const monthValue = month.length === 1 ? '0' + month : month;
    const dayValue = day.length === 1 ? '0' + day : day;

    setUserInformation((value: userInformationType) => ({
      ...value,
      birthDay: `${year}-${monthValue}-${dayValue}`,
    }));
  };

  const handleNicknameInputChange = (nickname: string) => {
    setUserInformation((value: userInformationType) => ({
      ...value,
      nickname: nickname,
    }));
  };

  return (
    <div className="space-y-[2.4rem]">
      <NicknameForm
        onInputChange={handleNicknameInputChange}
        userInformation={userInformation}
      />
      <BirthdateForm
        onInputChange={handleBirthDateInputChange}
        userInformation={userInformation}
      />
      <div>
        <span className="text-[1rem]">성별</span>
        <div className="mt-[1.3rem] flex justify-between">
          {(['male', 'female'] as const).map((gender) => (
            <button
              key={gender}
              className={`h-[3.9rem] w-[48%] rounded-[0.5rem] border-[1px] text-[1.4rem] ${
                userInformation.sex === gender
                  ? 'bg-secondary text-white'
                  : 'bg-black] text-[rgba(42,45,55,0.5)]'
              }`}
              onClick={() => handleSelectGender(gender)}
            >
              {gender === 'male' ? '남자' : '여자'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectNicknameAgeGender;
