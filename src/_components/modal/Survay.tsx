import styled from "@emotion/styled";
import palette from "../../style/color";
import { MAX_WIDTH } from "../../constants/viewSize";
import RightArrowButton from "../../images/Modal/right_arrow_icon.svg";
import { useAtom } from "jotai";
import { ModalHanlderAtom } from "../../atom/ModalAtom";
import { ModalCase } from "../../constants/modalEnum";

const Survay = () => {
  const [ModalStatusHanlder, setModalStatusHanlder] = useAtom(ModalHanlderAtom);

  const closeModal = () => {
    setModalStatusHanlder(ModalCase.None);
  };
  return (
    <ModalWrap>
      <div className="contentWrap">
        <h1>
          이용에 불편함은 없으신가요?
          <br />
          여러분의 소중한 의견을 들려주세요 !
        </h1>
        <h2>
          사용하면서 겪은 사소한 불편사항부터, 개선하면 좋겠다 싶은 건의사항까지
          <br />
          자유롭게 남겨주세요 ! 고참을 이용해주셔서 감사합니다 😊
        </h2>
        <a href={"https://forms.gle/2aAifxSauxcbwKsA7"} className="버튼">
          <p>설문조사 페이지로 이동</p>
          <img src={RightArrowButton} alt="화살표" />
        </a>
      </div>
      <div className="closeWrap">
        <p className="closeButton" onClick={() => closeModal()}>
          닫기
        </p>
      </div>
    </ModalWrap>
  );
};

export default Survay;

const ModalWrap = styled.div`
  @media screen and (min-width: 1300px) {
    margin-left: 25rem;
  }

  @media screen and (max-width: 1300px) {
    padding-left: 0;
  }

  width: ${MAX_WIDTH};
  /* height: 22.4rem; */
  margin: 0;
  background-color: ${palette.White};
  position: fixed;
  left: 50%;
  bottom: 0;
  box-shadow: 0 -1.2rem 2.5rem rgba(42, 45, 55, 0.1);
  border-radius: 1.2rem 1.2rem 0 0;
  transform: translate(-50%, 0);
  & .contentWrap {
    margin: 2.8rem 2.5rem 2.5rem;
  }
  & .버튼 {
    background-color: ${palette.Primary};
    border-radius: 0.5rem;
    height: 4.3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    letter-spacing: -0.03em;
    font-size: 1.4rem;
    padding: 0 1.3rem;
    color: ${palette.White};
    text-decoration: none;
  }
  & h1 {
    /* margin-top: 6rem; */
    text-align: left;
    font-weight: 700;
    font-size: 2.2rem;
    line-height: 3.2rem;
    letter-spacing: -0.03em;
    margin-bottom: 0.8rem;
  }
  & h2 {
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 1.9rem;
    letter-spacing: -0.03em;
    color: ${palette.Text3};
    margin-bottom: 1.3rem;
  }
  & .closeWrap {
    height: 4.7rem;
    border-top: 0.1rem solid ${palette.Gray2};
    display: flex;
    justify-content: end;
    align-items: center;
    & .closeButton {
      margin: 1.3rem 2.5rem;
      font-size: 1.4rem;
      letter-spacing: -0.03em;
      color: ${palette.Text3};
    }
  }
`;
