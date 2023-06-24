import styled from '@emotion/styled';
import { useAtom } from 'jotai';

import { ModalCase } from '@/constants/modalEnum';
import XIcon from '@/images/Modal/x_button.svg';
import { ModalHanlderAtom } from '@/states/ModalAtom';
import { justResultWorryHandlerAtom } from '@/states/justResultAtom';
import palette from '@/styles/color';

const ResultWithoutVote = () => {
  const [justResultWorryStatus, setJustResultWorryStatus] = useAtom(
    justResultWorryHandlerAtom
  );
  const [ModalStatusHanlder, setModalStatusHanlder] = useAtom(ModalHanlderAtom);

  const handleJustResult = () => {
    setModalStatusHanlder(ModalCase.None);
    setJustResultWorryStatus((value) => ({ ...value, confirm: true }));
  };

  const closeModal = () => {
    setModalStatusHanlder(ModalCase.None);
  };

  return (
    <ModalWrap>
      <img src={XIcon} className="X" onClick={() => closeModal()} />

      <h1>
        결과를 열람하시면
        <br />
        투표에 참여하실 수 없습니다.
      </h1>
      <div className="button" onClick={() => handleJustResult()}>
        그래도 볼게요
      </div>
    </ModalWrap>
  );
};
export default ResultWithoutVote;

const ModalWrap = styled.div`
  @media screen and (min-width: 1300px) {
    margin-left: 25rem;
  }

  @media screen and (max-width: 1300px) {
    padding-left: 0;
  }

  & .X {
    position: absolute;
    right: 1.3rem;
    top: 1.3rem;
  }
  & > h1 {
    margin-top: 6rem;
    text-align: center;
    font-weight: 700;
    font-size: 2.2rem;
    line-height: 3.2rem;
    letter-spacing: -0.03em;
  }

  & .button {
    width: 30.7rem;
    height: 4.7rem;
    background-color: ${palette.Primary};
    border-radius: 0.5rem;
    color: ${palette.White};
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 1.6rem;
    letter-spacing: -0.03em;
    margin: 0 1.6rem 1.3rem 1.6rem;
    position: absolute;
    bottom: 0;
  }
  width: 34rem;
  height: 22.4rem;
  margin: 0;
  background-color: ${palette.White};
  position: fixed;
  left: 50%;
  top: 50%;
  border-radius: 1.2rem;
  transform: translate(-50%, -50%);
`;
