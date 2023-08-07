import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BackIcon from '@/components/icons/BackIcon';
import TopAppBar from '@/components/layout/TopAppBar';
import Popup from '@/components/ui/modal/Popup';
import withAuth from '@/components/withAuth';

function SettingsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const SETTINGS_MENU: {
    title: string;
    link?: string;
    onClick?: () => void;
  }[] = [
    {
      title: '공지사항',
      link: 'https://www.notion.so/sharechang/61c9b8f802ca4769b4caca3bc1da5c97?pvs=4',
    },
    {
      title: '이용약관',
      link: 'https://www.notion.so/sharechang/2ad95f818e6a4df29afa5ecdf87e4052?pvs=4',
    },
    {
      title: '개인정보 처리방침',
      link: 'https://www.notion.so/sharechang/47d2c9861a704ef0aadf743856c97335?pvs=4',
    },
    {
      title: '문의하기',
    },
    {
      title: '로그아웃',
      onClick: () => setLogoutModalOpen(true),
    },
    {
      title: '탈퇴하기',
      onClick: () => navigate('/unregister'),
    },
  ];

  const handleLogout = () => {
    alert('로그아웃 되었습니다.\n고민이 있으면 언제든지 찾아와주세요!');
    sessionStorage.removeItem('selectMyPostTypeLabel');
    localStorage.removeItem('token');
    queryClient.clear();
    navigate('/');
  };

  return (
    <div>
      <TopAppBar title={'설정'} />
      <ul className="divide-y-[1px] divide-background-dividerLine-300">
        {SETTINGS_MENU.map((menu) => (
          <li
            key={menu.title}
            className="border-gray2 flex cursor-pointer items-center justify-between px-[2.5rem] pb-[2.1rem] pt-[2.3rem] font-system-body5"
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
      <Popup
        isOpen={logoutModalOpen}
        text="로그아웃 하시겠습니까?"
        subText="정말 로그아웃 하시겠나요?"
        buttonLabel="로그아웃"
        onCancel={() => setLogoutModalOpen(false)}
        onClickButton={handleLogout}
      />
    </div>
  );
}

export default withAuth(SettingsPage, { block: 'unauthenticated' });
