import { useAtom, useAtomValue } from 'jotai';
import { CSSProperties, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import useChooseOption from '@/apis/hooks/posts/useChooseOption';
import useGetMyChoice from '@/apis/hooks/posts/useGetMyChoice';
import useGetUsersChoices from '@/apis/hooks/posts/useGetUsersChoices';
import CheckIcon from '@/components/icons/CheckIcon';
import Popup from '@/components/ui/modal/Popup';
import Snackbar from '@/components/ui/modal/Snackbar';
import { selectedVoteOptionIdAtom } from '@/states/selectedVoteOption';
import { voteAnimationIdAtom } from '@/states/vote-animation';
import { customColors } from '@/styles/colors';

interface PostVoteProps {
  options?: { id: number; label: string; image: string | null }[];
  userId: number;
  postId: number;
  isClosed: boolean;
}

export default function PostVote({
  userId,
  postId,
  options,
  isClosed,
}: PostVoteProps) {
  const { choice } = useGetMyChoice({
    userId,
    postId,
  });
  const { usersChoices } = useGetUsersChoices(postId);
  const [selectedVoteOptionId, setSelectedVoteOptionId] = useAtom(
    selectedVoteOptionIdAtom
  );
  const [onlyReadModalOpen, setOnlyReadModalOpen] = useState(false);
  const { chooseOption } = useChooseOption();
  const optionIds = usersChoices?.map((option) => option.id);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const voteAnimationId = useAtomValue(voteAnimationIdAtom);
  const useAnimation = options?.find((option) => option.id === voteAnimationId);

  const handleButtonSelect = (id: number) => {
    if (!optionIds) {
      return null;
    }

    if (!selectedVoteOptionId) {
      setSelectedVoteOptionId(id);
    } else if (id === selectedVoteOptionId) {
      setSelectedVoteOptionId(null);
    } else if (optionIds?.includes(selectedVoteOptionId)) {
      setSelectedVoteOptionId(id);
    } else {
      setOpenSnackbar(true);
      setTimeout(() => {
        setOpenSnackbar(false);
      }, 3000);
    }
  };

  const handleGoBack = () => {
    const button = document.querySelector('#vote-selected');
    if (button) {
      button.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  if (!options || !usersChoices) {
    return null;
  }

  const handleAbstention = () => {
    const choiceId = usersChoices.find(
      (option) => option.isAbstained === 'yes'
    )?.id;
    if (!choiceId) {
      return;
    }
    chooseOption({ userId, worryChoiceId: choiceId });
    setOnlyReadModalOpen(false);
  };

  const total = usersChoices
    .filter((option) => !!option.label)
    .reduce((acc, cur) => acc + cur.userWorryChoiceCount, 0);

  if (choice || isClosed) {
    const isAbstained = choice?.isAbstained === 'yes';
    const mostVoted = usersChoices
      .filter((option) => !!option.label)
      .sort((a, b) => b.userWorryChoiceCount - a.userWorryChoiceCount)[0].label;
    return (
      <section className="mt-[1.1rem] px-[2.5rem]">
        <div className="space-y-[2.1rem] rounded-[0.5rem] border border-background-dividerLine-300 px-[1.7rem] py-[1.5rem]">
          {options.map((option) => {
            const count =
              usersChoices.find((o) => o.id === option.id)
                ?.userWorryChoiceCount || 0;
            const percentage =
              total === 0 ? 0 : Math.round((count / total) * 100);

            return (
              <div key={option.id}>
                <div key={option.id} className="relative flex">
                  {choice && !isAbstained && (
                    <CheckIcon
                      color={choice?.id === option.id ? '#222222' : '#e0e0e0'}
                    />
                  )}
                  <div className="ml-[0.6rem] flex flex-col">
                    <span className="font-system-body4">{option.label}</span>
                    <span className="text-text-explain-500 font-system-body1">
                      {percentage}% ({count}명)
                    </span>
                  </div>
                  {option.image && (
                    <img
                      src={option.image}
                      alt={option.label}
                      className="absolute right-0 aspect-square h-full object-cover"
                    />
                  )}
                </div>
                <div className="relative mt-[0.4rem] h-[4px] w-full rounded-[5px] bg-background-voteBg-100">
                  <div
                    className={twMerge(
                      `absolute left-0 top-0 h-full rounded-[5px] ${
                        choice?.id === option.id
                          ? 'bg-mainSub-main-500'
                          : 'bg-mainSub-mainPush-200'
                      }`,
                      choice && isAbstained && 'bg-text-subExplain-400',
                      choice &&
                        isAbstained &&
                        mostVoted === option.label &&
                        'bg-text-subTitle-700',
                      !choice && isClosed && 'bg-text-subExplain-400',
                      !choice &&
                        isClosed &&
                        mostVoted === option.label &&
                        'bg-text-subTitle-700'
                    )}
                    style={{
                      width: percentage + '%',
                      animationName: useAnimation ? 'slide-bar' : undefined,
                      animationDuration: '1.4s',
                    }}
                  />
                  <VoteIcon
                    className={`absolute -top-[4.2rem] ${
                      voteAnimationId === option.id
                        ? 'opacity-100'
                        : 'opacity-0'
                    } ${
                      !voteAnimationId && 'opacity-0'
                    } transition-all duration-[3000]`}
                    style={{
                      left: percentage - 11 + '%',
                      animationName: useAnimation ? 'slide-icon' : undefined,
                      animationDuration: '1.4s',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section className="px-[2.5rem]">
      <div className="mt-[1.2rem] flex flex-col space-y-[1.2rem]">
        {options.map((option) => (
          <button
            className={twMerge(
              'relative flex h-[4.4rem] items-center overflow-hidden rounded-[0.5rem] border border-background-dividerLine-300 text-start shadow-header',
              selectedVoteOptionId === option.id && 'bg-background-voteBg-100'
            )}
            key={option.id}
            onClick={() => handleButtonSelect(option.id)}
          >
            <CheckIcon
              color={
                selectedVoteOptionId === option.id
                  ? customColors.text.title['900']
                  : '#757575'
              }
              className="ml-[0.9rem] mr-[0.7rem] h-[2.4rem] w-[2.4rem]"
            />
            <span
              className={`font-system-body4 ${
                selectedVoteOptionId !== option.id && 'text-[#757575]'
              }`}
            >
              {option.label}
            </span>
            {option.image && (
              <img
                src={option.image}
                alt={option.label}
                className="absolute right-0 aspect-square h-full object-cover"
              />
            )}
          </button>
        ))}
      </div>
      <div className="mt-[1.5rem] flex justify-between text-text-explain-500 font-system-body2">
        <button
          className="underline"
          onClick={() => {
            setSelectedVoteOptionId(null);
            setOnlyReadModalOpen(true);
          }}
        >
          결과만 볼래요
        </button>
        <span>현재 투표한 사용자 {total}명</span>
      </div>
      <Popup
        isOpen={onlyReadModalOpen}
        text={'결과를 열람하시면\n투표에 참여하실 수 없습니다.'}
        buttonLabel="그래도 볼게요"
        onCancel={() => setOnlyReadModalOpen(false)}
        onClickButton={handleAbstention}
      />
      {openSnackbar && (
        <Snackbar
          text="다른 게시물에 동시에 투표할 수 없어요."
          actionText="원위치로 이동"
          className="fixed bottom-[11rem] left-1/2 -translate-x-1/2"
          onClick={handleGoBack}
        />
      )}
    </section>
  );
}

function VoteIcon({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="65"
      height="46"
      viewBox="0 0 65 46"
      fill="none"
      className={className}
      style={style}
    >
      <path
        d="M3.70937 45.6483C1.34264 45.6064 -3.9703 42.1575 5.10567 42.1575C12.3839 42.1575 11.7381 28.1945 14.5307 20.1658C16.6391 14.1023 21.6903 8.20642 29.4048 5.97234C35.9465 4.08035 40.8196 5.78384 44.6315 8.40889C53.711 14.6608 53.9763 25.0528 53.156 28.9136C52.4334 32.3101 50.667 38.3177 44.5512 42.5066C41.5422 44.5697 35.1262 45.9974 27.4465 45.9974C18.8313 45.9974 6.93483 45.7076 3.70937 45.6483Z"
        fill="#FF7860"
      />
      <path
        d="M35.8742 18.8187C35.368 20.7491 36.2581 21.381 38.192 21.6707C40.1294 21.9604 52.546 14.3715 53.3175 12.497C53.9947 10.8563 52.0015 8.14051 50.5214 8.0672C48.5456 7.96946 36.3803 16.8883 35.8742 18.8187Z"
        fill="#DB5146"
      />
      <path
        d="M24.3115 4.29753C24.3011 6.25236 35.0561 21.1055 36.99 21.3953C38.9273 21.685 39.4509 21.2103 41.5978 19.7267C42.3692 19.1926 31.9214 1.59918 29.4988 0.750923C27.9454 0.209855 24.3185 2.35667 24.3115 4.29753Z"
        fill="#DB5146"
      />
      <path
        d="M33.8208 23.2826C34.2611 22.9736 34.364 22.3611 34.0506 21.9144C33.7372 21.4678 33.1262 21.3562 32.6859 21.6652C32.2456 21.9741 32.1427 22.5867 32.4561 23.0333C32.7695 23.4799 33.3805 23.5915 33.8208 23.2826Z"
        fill="black"
      />
      <path
        d="M52.1334 28.9332C53.987 28.9926 54.7689 29.1811 56.8948 29.188C58.8321 29.195 60.5601 29.6349 61.1709 30.4796C61.9668 31.5827 61.0348 33.548 60.211 34.1449C58.134 35.6424 56.0325 35.9531 54.8631 36.0648C53.795 36.1661 51.2188 36.4523 49.7003 36.2638C48.6356 36.1312 45.9687 35.3527 45.7243 33.3246C45.5707 32.04 46.4574 30.6192 47.6861 29.8129C48.7473 29.1112 49.9063 28.8634 52.1334 28.9332Z"
        fill="#FF7860"
      />
      <path
        d="M41.0015 25.1908C41.4418 24.8818 41.5447 24.2693 41.2313 23.8227C40.9179 23.376 40.3069 23.2644 39.8666 23.5734C39.4263 23.8824 39.3234 24.4949 39.6368 24.9415C39.9502 25.3881 40.5612 25.4997 41.0015 25.1908Z"
        fill="black"
      />
      <path
        d="M9.29412 34.1248C6.83313 33.4337 11.3257 24.0645 13.134 22.2562C15.5775 19.8127 13.8321 17.7183 18.796 19.0727C21.2604 19.7464 22.6916 22.3156 22.0005 24.7766C21.3093 27.2376 11.7516 34.816 9.29412 34.1248Z"
        fill="url(#paint0_linear_3262_18531)"
      />
      <path
        d="M12.0418 30.9006C13.8326 30.2338 15.7001 29.5392 17.4874 31.2078C19.0198 32.6355 18.8313 34.723 18.1332 35.9796C17.2849 37.5121 12.9285 38.8735 10.656 38.5034C8.4219 38.1404 7.02559 37.7913 5.62929 36.7441C4.02005 35.5363 3.7757 32.7995 4.23299 30.8098C4.62744 29.0854 6.01676 26.6733 8.69068 25.3468C10.2964 24.5474 12.2024 23.378 13.658 21.3848"
        fill="#FF7860"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.7607 21.2445C13.8385 21.3014 13.8556 21.4106 13.7987 21.4884C12.3192 23.5143 10.3846 24.699 8.7682 25.5037L8.76798 25.5039C6.14745 26.8039 4.78735 29.1686 4.40286 30.8495L4.40282 30.8496C4.17904 31.8233 4.12724 32.9805 4.32742 34.0385C4.52796 35.0983 4.97674 36.037 5.73375 36.6052C7.09401 37.6254 8.45387 37.9695 10.6837 38.3319L10.6838 38.3319C11.7808 38.5105 13.4073 38.2714 14.874 37.7898C15.6046 37.55 16.2872 37.2526 16.8366 36.9235C17.3905 36.5917 17.7904 36.2388 17.9802 35.8958L17.9803 35.8956C18.6532 34.6844 18.8235 32.6921 17.3682 31.3362L17.368 31.3361C16.5113 30.5362 15.6448 30.3073 14.7749 30.3534C13.8922 30.4002 13.0033 30.7295 12.1024 31.0649C12.0121 31.0985 11.9116 31.0525 11.878 30.9622C11.8443 30.8719 11.8903 30.7714 11.9806 30.7377L11.9927 30.7332C12.879 30.4032 13.8151 30.0547 14.7564 30.0048C15.7148 29.9541 16.6757 30.2122 17.6062 31.0809C19.2156 32.5804 19.0089 34.763 18.2855 36.0651C18.0512 36.4883 17.5885 36.8801 17.016 37.223C16.439 37.5685 15.7315 37.8757 14.9828 38.1215C13.4912 38.6113 11.8032 38.8678 10.6277 38.6764C8.38939 38.3127 6.95664 37.9587 5.5243 36.8845L5.52425 36.8844C4.67205 36.2448 4.19405 35.2112 3.98443 34.1033C3.77445 32.9936 3.8291 31.7875 4.06259 30.7715C4.46703 29.0036 5.88555 26.5442 8.61274 25.1912C10.2078 24.3971 12.0851 23.243 13.5168 21.2826C13.5737 21.2047 13.6829 21.1877 13.7607 21.2445Z"
        fill="white"
      />
      <path
        d="M60.3743 37.19C62.9287 37.19 64.9995 35.1192 64.9995 32.5647C64.9995 30.0103 62.9287 27.9395 60.3743 27.9395C57.8198 27.9395 55.749 30.0103 55.749 32.5647C55.749 35.1192 57.8198 37.19 60.3743 37.19Z"
        fill="url(#paint1_linear_3262_18531)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.5643 26.6585C33.6563 26.5954 33.782 26.6188 33.8451 26.7108C34.063 27.0284 34.2931 27.2753 34.5979 27.4752C34.9042 27.6761 35.2965 27.8362 35.8471 27.9654L35.8473 27.9654C36.122 28.0302 36.5191 28.024 36.8945 27.9583C37.0801 27.9257 37.2537 27.8798 37.3978 27.8246C37.5453 27.7682 37.647 27.7077 37.7025 27.6539C37.7826 27.5763 37.9105 27.5783 37.9881 27.6584C38.0657 27.7385 38.0637 27.8664 37.9836 27.944C37.8715 28.0526 37.7118 28.137 37.5422 28.2019C37.369 28.2682 37.1696 28.3202 36.9642 28.3561C36.5577 28.4274 36.1013 28.4404 35.7547 28.3586C35.1743 28.2225 34.7341 28.0475 34.3764 27.813C34.017 27.5773 33.7514 27.2884 33.512 26.9393C33.4489 26.8473 33.4723 26.7216 33.5643 26.6585Z"
        fill="#0C0C0C"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M38.0876 26.6846C38.1911 26.7264 38.2411 26.8441 38.1994 26.9475C38.1181 27.1491 38.0918 27.2569 38.0915 27.3569C38.0911 27.4614 38.1187 27.5758 38.1874 27.7962L38.1875 27.7962C38.2343 27.9463 38.3311 28.0814 38.4325 28.1866C38.4823 28.2384 38.5309 28.2804 38.5705 28.3109C38.5903 28.3262 38.6071 28.3379 38.6199 28.3463C38.6321 28.3542 38.6378 28.3571 38.6378 28.3571C38.6378 28.3571 38.6376 28.3571 38.6373 28.3569C38.7387 28.4034 38.7832 28.5233 38.7368 28.6247C38.6903 28.7261 38.5704 28.7706 38.469 28.7241C38.3953 28.6904 38.2651 28.5951 38.1415 28.4668C38.0142 28.3347 37.8737 28.1469 37.8018 27.9165M38.0876 26.6846C37.9842 26.6429 37.8665 26.6929 37.8248 26.7964L38.0876 26.6846ZM37.8248 26.7964C37.7385 27.0102 37.6881 27.1764 37.6875 27.3557L37.8248 26.7964ZM37.6875 27.3557C37.687 27.5305 37.7345 27.7006 37.8018 27.9165L37.6875 27.3557Z"
        fill="black"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34.2352 25.7411C34.3388 25.7825 34.3891 25.9 34.3477 26.0036C34.3409 26.0207 34.3338 26.0393 34.3261 26.0593C34.2928 26.1465 34.2497 26.2592 34.1798 26.3758C34.0907 26.5246 33.9597 26.68 33.7465 26.8456L33.7464 26.8457C33.5362 27.0087 33.289 27.0742 33.0903 27.0998C32.8899 27.1256 32.7222 27.113 32.6583 27.1071C32.5472 27.097 32.4654 26.9988 32.4755 26.8877C32.4856 26.7766 32.5838 26.6948 32.6949 26.7049C32.7462 26.7095 32.8805 26.7195 33.0387 26.6991C33.1987 26.6785 33.3669 26.6288 33.4988 26.5265C33.6765 26.3885 33.7724 26.2698 33.8333 26.1682C33.8834 26.0846 33.9114 26.0118 33.9437 25.9277C33.9528 25.9041 33.9623 25.8795 33.9726 25.8536C34.0141 25.75 34.1316 25.6996 34.2352 25.7411Z"
        fill="black"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3262_18531"
          x1="17.9514"
          y1="18.8363"
          x2="13.3435"
          y2="35.2618"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF7860" />
          <stop offset="0.9343" stopColor="#FF7860" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_3262_18531"
          x1="61.6255"
          y1="28.1123"
          x2="59.1266"
          y2="37.0199"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF7860" />
          <stop offset="0.9343" stopColor="#FF7860" />
        </linearGradient>
      </defs>
    </svg>
  );
}
