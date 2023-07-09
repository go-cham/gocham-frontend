import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import BackIcon from '@/components/icons/BackIcon';
import TopAppBar from '@/components/layout/TopAppBar';
import { appVersion } from '@/version';

export default function SettingsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const SETTINGS_MENU: {
    title: string;
    link?: string;
    onClick?: () => void;
  }[] = [
    {
      title: '공지사항',
      link: 'https://sharechang.notion.site/b422a175512e4710ba4c2ca2ebc8e035',
    },
    {
      title: '이용약관',
      link: 'https://sharechang.notion.site/ac3f06fe803b497681f807f3df65fbe2',
    },
    {
      title: '개인정보 처리방침',
      link: 'https://sharechang.notion.site/c18f70f5ee40492fb8cdb89336014097',
    },
    {
      title: '문의하기',
    },
    {
      title: '로그아웃',
      onClick: () => {
        localStorage.removeItem('token');
        queryClient.clear();
        navigate('/');
      },
    },
    {
      title: '탈퇴하기',
      onClick: () => {
        alert('개발중입니다. 회원탈퇴는 관리자에게 연락해주세요.');
      },
    },
  ];

  return (
    <div>
      <TopAppBar title={'설정'} />
      <ul className="divide-y-[1px] divide-custom-gray-300">
        {SETTINGS_MENU.map((menu) => (
          <li
            key={menu.title}
            className="flex cursor-pointer items-center justify-between border-gray2 px-[2.5rem] pb-[2.1rem] pt-[2.3rem] text-body5"
            onClick={menu.onClick}
          >
            {menu.link ? (
              <a
                href={menu.link}
                rel="noreferrer"
                target="_blank"
                className="flex h-full w-full items-center"
              >
                {menu.title}
              </a>
            ) : (
              menu.title
            )}
            <BackIcon className="h-[3.2rem] w-[3.2rem] rotate-180" />
          </li>
        ))}
      </ul>
    </div>
  );
}
