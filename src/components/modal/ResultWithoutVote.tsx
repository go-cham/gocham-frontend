import { useAtom } from 'jotai';

import { ModalCase } from '@/constants/modalEnum';
import XIcon from '@/images/Modal/x_button.svg';
import { ModalHanlderAtom } from '@/states/ModalAtom';
import { justResultWorryHandlerAtom } from '@/states/justResultAtom';

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
    <div className="absolute left-1/2 top-1/2 z-[100] h-[22.4rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-[1.2rem] bg-white px-[1.6rem] pb-[1.4rem]">
      <img
        src={XIcon}
        alt="close"
        className="absolute right-[1.3rem] top-[1.3rem]"
        onClick={closeModal}
      />
      <div className="flex h-full flex-col items-center justify-between">
        <p className="mt-[6rem] text-center text-[2.2rem] font-bold">
          결과를 열람하시면
          <br />
          투표에 참여하실 수 없습니다.
        </p>
        <button
          className="flex h-[4.7rem] w-full items-center justify-center rounded-[0.5rem] bg-primary text-[1.6rem] font-bold text-white"
          onClick={handleJustResult}
        >
          그래도 볼게요
        </button>
      </div>
    </div>
  );
};
export default ResultWithoutVote;
