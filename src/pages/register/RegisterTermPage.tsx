import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

import BackIcon from '@/components/icons/BackIcon';
import Button from '@/components/ui/buttons/Button';
import withAuth from '@/components/withAuth';
import { registerDataAtom } from '@/states/registerData';

import TermCheckbox from './components/TermCheckbox';

function RegisterTermPage() {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useAtom(registerDataAtom);
  const { accept } = registerData;

  const nextEnabled = accept.gochamTerm && accept.personalInformation;

  const handleNext = () => {
    navigate('/collect-information');
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <BackIcon
        onClick={() => navigate('/login')}
        className="ml-[0.9rem] cursor-pointer"
        color="#424242"
      />
      <div className="mt-[3.3rem] w-full flex-1 px-[2.5rem]">
        <div className="font-custom-hero">
          <p>환영합니다 !</p>
          <p>서비스 이용약관에</p>
          <p>동의해주세요.</p>
        </div>
        <section className="mt-[3.5rem]">
          <TermCheckbox
            text="모두 동의합니다."
            checked={accept.gochamTerm && accept.personalInformation}
            onCheck={(checked) =>
              setRegisterData({
                ...registerData,
                accept: {
                  gochamTerm: checked,
                  personalInformation: checked,
                  allCheck: checked,
                },
              })
            }
          />
          <div className="relative -left-[2.5rem] my-[1.7rem] h-[1px] w-[calc(100%+5rem)] bg-background-dividerLine-300" />
          <div className="space-y-[1.3rem]">
            <TermCheckbox
              text="[필수] 고민의 참견 이용약관 동의"
              link="https://sharechang.notion.site/2ad95f818e6a4df29afa5ecdf87e4052?pvs=4"
              checked={accept.gochamTerm}
              onCheck={(checked) => {
                setRegisterData({
                  ...registerData,
                  accept: {
                    ...registerData.accept,
                    gochamTerm: checked,
                  },
                });
              }}
            />
            <TermCheckbox
              text="[필수] 개인정보 수집 및 이용 동의"
              link="https://sharechang.notion.site/47d2c9861a704ef0aadf743856c97335?pvs=4"
              checked={accept.personalInformation}
              onCheck={(checked) => {
                setRegisterData({
                  ...registerData,
                  accept: {
                    ...registerData.accept,
                    personalInformation: checked,
                  },
                });
              }}
            />
          </div>
        </section>
      </div>
      <Button
        className="absolute bottom-[4.8rem] left-1/2 -translate-x-1/2"
        disabled={!nextEnabled}
        onClick={handleNext}
      >
        다음
      </Button>
    </div>
  );
}

export default withAuth(RegisterTermPage, { block: 'activated' });
