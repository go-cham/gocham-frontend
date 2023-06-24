import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RouteURL } from '@/App';
import AppBar from '@/components/layout/AppBar';
import BottomContinueBar from '@/components/layout/BottomContinueBar';
import { userType } from '@/constants/userTypeEnum';
import ApiConfig, { HttpMethod } from '@/dataManager/apiConfig';
import { EndPoint } from '@/dataManager/apiMapper';
import { userAtom } from '@/states/userData';
import palette from '@/styles/color';
import { alertMessage } from '@/utils/alertMessage';

import TermCheckBox from './TermCheckBox';

export type AcceptType = {
  gochamTerm: boolean;
  personalInformation: boolean;
  olderThan14: boolean;
  marketing: boolean;
  allCheck: boolean;
};

const RegisterTermPage = () => {
  const navigate = useNavigate();
  const userInfo = useAtomValue(userAtom);
  const [accept, setAccept] = useState<AcceptType>({
    gochamTerm: false,
    personalInformation: false,
    olderThan14: false,
    marketing: false,
    allCheck: false,
  });

  useEffect(() => {
    // HOC로 안잡히는 부분 잡기위함
    if (userInfo.userType === userType.activatedUser) navigate(RouteURL.home);
  }, [userInfo]);

  useEffect(() => {
    if (accept.gochamTerm && accept.personalInformation && accept.olderThan14) {
      setAccept((value) => ({ ...value, allCheck: true }));
    }
  }, [accept.allCheck]);

  const handleRegister = async () => {
    //   회원가입 로직
    try {
      const res = await ApiConfig.request({
        method: HttpMethod.PATCH,
        url: EndPoint.user.patch.USER_ACCEPTANCE_OF_TERMS,
        data: {
          userId: userInfo.userId,
          privacyAcceptedStatus: accept.personalInformation ? 1 : 0,
          termsOfUseAcceptedStatus: accept.gochamTerm ? 1 : 0,
          marketingAcceptedStatus: 0, // 우선 무조건 0으로
          // marketingAcceptedStatus: accept.marketing ? 1 : 0,
        },
      });
      if (res?.data.id) {
        console.log('동의완료');
        navigate(RouteURL.collect_information);
      } else {
        alert(alertMessage.error.register.didntAgreeTerm);
        navigate(RouteURL.home);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const nextEnabled =
    accept.gochamTerm && accept.personalInformation && accept.olderThan14;

  return (
    <div className="flex h-full flex-col items-center">
      <AppBar boxShadow={false} />
      <div className="mx-auto w-[90%] flex-1">
        <div className="mt-[3.9rem] text-[2.7rem] font-bold leading-[3.9rem]">
          <p>환영합니다!</p>
          <p>서비스 이용약관에</p>
          <p>동의해주세요.</p>
        </div>
        <section className="mt-[3.9rem] space-y-[0.7rem]">
          <TermCheckBox
            text="모두 동의합니다."
            checked={
              accept.gochamTerm &&
              accept.personalInformation &&
              accept.olderThan14 &&
              accept.marketing
            }
            onCheck={(value) =>
              setAccept({
                gochamTerm: value,
                personalInformation: value,
                olderThan14: value,
                marketing: value,
                allCheck: value,
              })
            }
          />
          <div className="h-[1px] w-full bg-black" />
          <TermCheckBox
            text="[필수] 고민의 참견 이용약관 동의"
            link="https://sharechang.notion.site/ac3f06fe803b497681f807f3df65fbe2"
            checked={accept.gochamTerm}
            onCheck={(value) => setAccept({ ...accept, gochamTerm: value })}
          />
          <TermCheckBox
            text="[필수] 개인정보 수집 및 이용 동의"
            link="https://sharechang.notion.site/c18f70f5ee40492fb8cdb89336014097"
            checked={accept.personalInformation}
            onCheck={(value) =>
              setAccept({ ...accept, personalInformation: value })
            }
          />
          <TermCheckBox
            text="[필수] 만 14세 이상 입니다."
            checked={accept.olderThan14}
            onCheck={(value) => setAccept({ ...accept, olderThan14: value })}
          />
          <TermCheckBox
            text="[선택] 마케팅 목적 이용 동의"
            link="https://sharechang.notion.site/c18f70f5ee40492fb8cdb89336014097"
            checked={accept.marketing}
            onCheck={(value) => setAccept({ ...accept, marketing: value })}
          />
        </section>
      </div>
      <BottomContinueBar
        title={'다음'}
        height={11.2}
        boxShadow={false}
        buttonColor={nextEnabled ? palette.Primary : 'rgba(42, 45, 55, 0.1)'}
        fontColor={nextEnabled ? 'white' : 'rgba(42, 45, 55, 0.34)'}
        clickAction={nextEnabled ? handleRegister : undefined}
      />
    </div>
  );
};

export default RegisterTermPage;
