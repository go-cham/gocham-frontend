import styled from "@emotion/styled";
import palette from "../../style/color";
import XIcon from "../../images/Modal/x_button.svg";
const ResultWithoutVote = () => {
  return (
    <ModalWrap>
      <img src={XIcon} className="X" />
      <h1>
        결과를 열람하시면
        <br />
        투표에 참여하실 수 없습니다.
      </h1>
      <div className="button">그래도 볼게요</div>
    </ModalWrap>
  );
};
export default ResultWithoutVote;

const ModalWrap = styled.div`
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
