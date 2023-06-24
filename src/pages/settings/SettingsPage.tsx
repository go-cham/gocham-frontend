/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useSetAtom } from 'jotai';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import AppBar from '@/components/layout/AppBar';
import { initialUserData, userAtom } from '@/states/userData';
import palette from '@/styles/color';
import { ButtonStyle } from '@/styles/common';
import { appVersion } from '@/version';

const SettingsPage = () => {
  const navigate = useNavigate();
  const setUserInfo = useSetAtom(userAtom);

  const handleButtonClick = (goto: string) => {
    if (goto === 'notice')
      window.location.href =
        'https://sharechang.notion.site/b422a175512e4710ba4c2ca2ebc8e035';
    if (goto === 'terms')
      window.location.href =
        'https://sharechang.notion.site/ac3f06fe803b497681f807f3df65fbe2';
    if (goto === 'informationTerm')
      window.location.href =
        'https://sharechang.notion.site/c18f70f5ee40492fb8cdb89336014097';
    if (goto === 'quesition')
      window.location.href =
        'https://sharechang.notion.site/c18f70f5ee40492fb8cdb89336014097';
    if (goto === 'logout') {
      window.localStorage.removeItem('token');
      navigate('/');
      setUserInfo(initialUserData);
    }
    if (goto === 'deleteAccount')
      alert('개발중입니다. 회원탈퇴는 관리자에게 연락해주세요.');
  };
  return (
    <SettingsWrap>
      <AppBar title={'설정'} />
      <div className={'wrap'}>
        <Button
          width={'100%'}
          height={7.4}
          onClick={() => handleButtonClick('notice')}
          style={{ borderTop: `0.1rem solid ${palette.Gray2}` }}
        >
          공지사항
        </Button>
        <Button
          width={'100%'}
          height={7.4}
          onClick={() => handleButtonClick('terms')}
        >
          이용약관
        </Button>
        <Button
          width={'100%'}
          height={7.4}
          onClick={() => handleButtonClick('informationTerm')}
        >
          개인정보 처리방침
        </Button>
        <Button
          width={'100%'}
          height={7.4}
          onClick={() => handleButtonClick('question')}
        >
          문의하기
        </Button>
        <Button
          width={'100%'}
          height={7.4}
          onClick={() => handleButtonClick('faq')}
        >
          FAQ
        </Button>
        <Button
          width={'100%'}
          height={7.4}
          onClick={() => handleButtonClick('logout')}
        >
          로그아웃
        </Button>
        <Button
          width={'100%'}
          height={7.4}
          onClick={() => handleButtonClick('deleteAccount')}
        >
          탈퇴하기
        </Button>
        <Button width={'100%'} height={7.4}>
          버전: {appVersion}
        </Button>
        <Button width={'100%'} height={7.4}>
          Copyright © go-cham Team. All rights reserved.
        </Button>
      </div>
    </SettingsWrap>
  );
};

export default SettingsPage;

const SettingsWrap = styled.div`
  //background-color: ${palette.Gray3};
  position: relative;
  width: 100%;
  height: 100vh;
`;

const Button = styled(ButtonStyle)`
  justify-content: left;
  //border-top: 0.1rem solid ${palette.Gray2};
  border-bottom: 0.1rem solid ${palette.Gray2};
  padding-left: 2.5rem;
  font-size: 1.6rem;
  font-weight: 500;
  background-color: ${palette.Background};
  box-sizing: border-box;
`;
