import styled from "@emotion/styled";

interface BannerProps {
  show: boolean;
  applyUpdate: () => void;
}

export const Banner = (props: BannerProps) => {
  const { show, applyUpdate } = props;

  if (true) {
    return (
      <BannerWrap>
        새 버전으로 업데이트합니다.
        <button className="btn" onClick={applyUpdate}>
          확인
        </button>
      </BannerWrap>
    );
  }
};

const BannerWrap = styled.div`
  z-index: 100;
  width: 300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 10px 15px 10px 20px;
  border-radius: 6px;
  position: absolute;
  left: 50%;
  top: 8rem;
  transform: translateX(-50%);
  background-color: rgb(0, 0, 0);
  color: white;
  height: 40px;
  font-size: 0.9em;
  align-items: center;
  box-sizing: border-box;

  & .btn {
    border-radius: 6px;
    font-size: 0.9em;
    display: flex;
    align-items: center;
    color: rgb(249, 160, 160);
    border: none;
    height: 24px;
    font-weight: bold;
    background: none;
    cursor: pointer;
  }

  & .btn:hover {
    color: rgb(237, 144, 144);
  }
`;
