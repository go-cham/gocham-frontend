import styled from '@emotion/styled';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

import ResultWithoutVote from '@/components/modal/ResultWithoutVote';
import Survey from '@/components/modal/Survey';
import { ModalCase } from '@/constants/modalEnum';
import { MAX_WIDTH } from '@/constants/viewSize';
import { ModalHanlderAtom } from '@/states/ModalAtom';

const ModalController = () => {
  const [modalType, setModalType] = useAtom(ModalHanlderAtom);

  const modalHanlder = () => {
    if (modalType === ModalCase.None) return null;
    if (modalType === ModalCase.ResultWithoutVote) {
      return (
        <>
          <ModalControllerWrap>
            <ResultWithoutVote />
            <ModalBackground />
          </ModalControllerWrap>
        </>
      );
    }
    if (modalType === ModalCase.Survey) {
      return (
        <>
          <ModalControllerWrap>
            <Survey />
          </ModalControllerWrap>
        </>
      );
    }
  };

  useEffect(() => {
    modalHanlder();
  }, [modalType]);

  return <>{modalHanlder()}</>;
};

export default ModalController;

const ModalBackground = styled.div`
  background: rgba(42, 45, 55, 0.5);
  height: 100vh;
`;

const ModalControllerWrap = styled.div`
  width: ${MAX_WIDTH};

  height: 100%;
  position: fixed;
  z-index: 100;
`;
