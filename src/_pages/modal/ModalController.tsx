import styled from "@emotion/styled";
import { MAX_WIDTH } from "../../constants/viewSize";
import { useAtom } from "jotai";
import { ModalHanlderAtom } from "../../atom/ModalAtom";
import { useEffect } from "react";
import { ModalCase } from "../../constants/modalEnum";
import ResultWithoutVote from "../../_components/modal/ResultWithoutVote";
import Survay from "../../_components/modal/Survay";

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
            <Survay />
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
