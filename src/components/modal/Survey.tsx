import { useAtom } from 'jotai';

import { ModalCase } from '@/constants/modalEnum';
import RightArrowButton from '@/images/Modal/right_arrow_icon.svg';
import { ModalHanlderAtom } from '@/states/ModalAtom';

const Survey = () => {
  const [modalStatusHanlder, setModalStatusHanlder] = useAtom(ModalHanlderAtom);

  const closeModal = () => {
    setModalStatusHanlder(ModalCase.None);
  };

  return (
    <div className="absolute bottom-0 z-[100] w-full rounded-t-[1.2rem] bg-white shadow-[0_-1.2rem_2.5rem_rgba(42,45,55,0.1)]">
      <div className="p-[2.5rem] pt-[2.5rem]">
        <h1 className="mb-[0.8rem] text-[2.2rem] font-bold">
          이용에 불편함은 없으신가요?
          <br />
          여러분의 소중한 의견을 들려주세요 !
        </h1>
        <p className="mb-[1.3rem] text-[1.2rem] text-text3">
          사용하면서 겪은 사소한 불편사항부터, 개선하면 좋겠다 싶은 건의사항까지
          <br />
          자유롭게 남겨주세요 ! 고참을 이용해주셔서 감사합니다 😊
        </p>
        <button className="flex h-[4.3rem] w-full items-center justify-between rounded-[0.5rem] bg-primary px-[1.3rem] text-white">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://forms.gle/2aAifxSauxcbwKsA7"
          >
            설문조사 페이지로 이동
          </a>
          <img src={RightArrowButton} alt="화살표" />
        </button>
      </div>
      <div className="flex h-[4.7rem] items-center justify-end border-t-[0.1rem] border-gray2 px-[2.5rem] py-[1.3rem]">
        <button className="text-[1.4rem] text-text3" onClick={closeModal}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default Survey;
