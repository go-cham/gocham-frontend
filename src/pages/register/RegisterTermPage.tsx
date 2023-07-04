import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useUser from '@/apis/hooks/users/useUser';
import BackIcon from '@/components/icons/BackIcon';
import Button from '@/components/ui/buttons/Button';
import { RouteURL } from '@/constants/route-url';
import ApiConfig, { HttpMethod } from '@/dataManager/apiConfig';
import { EndPoint } from '@/dataManager/apiMapper';
import { alertMessage } from '@/utils/alertMessage';

import TermCheckbox from './TermCheckbox';

export type AcceptType = {
  gochamTerm: boolean;
  personalInformation: boolean;
  olderThan14: boolean;
  marketing: boolean;
  allCheck: boolean;
};

export default function RegisterTermPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [accept, setAccept] = useState<AcceptType>({
    gochamTerm: false,
    personalInformation: false,
    olderThan14: false,
    marketing: false,
    allCheck: false,
  });

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
          userId: user?.id,
          privacyAcceptedStatus: accept.personalInformation ? 1 : 0,
          termsOfUseAcceptedStatus: accept.gochamTerm ? 1 : 0,
          marketingAcceptedStatus: 0, // 우선 무조건 0으로
          // marketingAcceptedStatus: accept.marketing ? 1 : 0,
        },
      });
      if (res?.data.id) {
        navigate(RouteURL.collect_information);
      } else {
        alert(alertMessage.error.register.didntAgreeTerm);
        navigate(RouteURL.home);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const nextEnabled =
    accept.gochamTerm && accept.personalInformation && accept.olderThan14;

  return (
    <div className="flex h-full flex-col bg-white">
      <BackIcon
        onClick={() => navigate(RouteURL.login)}
        className="ml-[0.9rem] cursor-pointer"
        color="#424242"
      />
      <div className="mt-[3.3rem] w-full flex-1 px-[2.5rem]">
        <div className="text-hero">
          <p>환영합니다 !</p>
          <p>서비스 이용약관에</p>
          <p>동의해주세요.</p>
        </div>
        <section className="mt-[3.5rem]">
          <TermCheckbox
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
          <div className="relative -left-[2.5rem] my-[1.7rem] h-[1px] w-[calc(100%+5rem)] bg-custom-background-200" />
          <div className="space-y-[1.3rem]">
            <TermCheckbox
              text="[필수] 고민의 참견 이용약관 동의"
              link="https://sharechang.notion.site/ac3f06fe803b497681f807f3df65fbe2"
              checked={accept.gochamTerm}
              onCheck={(value) => setAccept({ ...accept, gochamTerm: value })}
            />
            <TermCheckbox
              text="[필수] 개인정보 수집 및 이용 동의"
              link="https://sharechang.notion.site/c18f70f5ee40492fb8cdb89336014097"
              checked={accept.personalInformation}
              onCheck={(value) =>
                setAccept({ ...accept, personalInformation: value })
              }
            />
            <TermCheckbox
              text="[필수] 만 14세 이상 입니다."
              checked={accept.olderThan14}
              onCheck={(value) => setAccept({ ...accept, olderThan14: value })}
            />
            <TermCheckbox
              text="[선택] 마케팅 목적 이용 동의"
              link="https://sharechang.notion.site/c18f70f5ee40492fb8cdb89336014097"
              checked={accept.marketing}
              onCheck={(value) => setAccept({ ...accept, marketing: value })}
            />
          </div>
        </section>
      </div>
      <Button
        className="absolute bottom-[4.8rem] left-1/2 -translate-x-1/2"
        disabled={!nextEnabled}
        onClick={handleRegister}
      >
        다음
      </Button>
    </div>
  );
}
