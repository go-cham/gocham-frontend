import { useAtom } from 'jotai';
import { useEffect } from 'react';

import ResultWithoutVote from '@/components/modal/ResultWithoutVote';
import Survey from '@/components/modal/Survey';
import { ModalCase } from '@/constants/modalEnum';
import { ModalHanlderAtom } from '@/states/ModalAtom';

export default function ModalController() {
  const [modalType, setModalType] = useAtom(ModalHanlderAtom);

  const modalHanlder = () => {
    if (modalType === ModalCase.None) return null;
    if (modalType === ModalCase.ResultWithoutVote) {
      return (
        <div>
          <ResultWithoutVote />
          <BackDrop />
        </div>
      );
    }
    if (modalType === ModalCase.Survey) {
      return <Survey />;
    }
  };

  useEffect(() => {
    modalHanlder();
  }, [modalType]);

  return <>{modalHanlder()}</>;
}

function BackDrop() {
  return (
    <div className="absolute left-0 top-0 z-30 h-full w-full bg-[rgba(42,45,55,0.5)]" />
  );
}
