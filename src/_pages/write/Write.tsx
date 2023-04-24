/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import AppBar from "../../_components/common/AppBar";
import BottomContinueBar from "../../_components/common/BottomContinueBar";
import palette from "../../style/color";
import styled from "@emotion/styled";
import { useState } from "react";
import CameraIcon from "../../images/Write/Camera.svg";

type WriteContentType = {
  title: string;
  content: string;
  category: string;
  deadline: string;
  pros: string;
  cons: string;
};

const Write = () => {
  const handleUpload = async () => {
    console.log("hloa!");
  };

  const [votingContent, setVotingContent] = useState<WriteContentType>({
    title: "",
    content: "",
    category: "",
    deadline: "",
    pros: "",
    cons: "",
  });

  const [readyUpload, setReadyUpload] = useState(false);
  return (
    <WriteWrap>
      <AppBar title={"글 작성"} />
      <WriteComponent>
        <div className={"글제목"}>
          <h1>글 제목</h1>
          <div className={"제목입력박스 입력박스"}>
            <input placeholder={"제목 작성 또는 이미지 선택"} />
            <img src={CameraIcon} alt={"이미지선택"} />
          </div>
        </div>
        <div className={"글내용"}>
          <h1>내용</h1>
          <div className={"입력박스"}>
            <textarea placeholder={"최대 280자 입력"} />
          </div>
          <div className={"내용글자수"}>{votingContent.content.length}/280</div>
        </div>
        <div className={"카테고리_투표마감시간"}>
          <div>
            <h1>카테고리</h1>
            <div className={"입력박스"}>
              <select>
                <option>11</option>
                <option>22</option>
              </select>
            </div>
          </div>
          <div>
            <h1>투표 마감 시간</h1>
            <div className={"입력박스"}>
              <select>
                <option>11</option>
                <option>22</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <h1>옵션 수정</h1>

          <h2>아래의 옵션을 눌러서 원하는 텍스트로 변경할 수 있어요.</h2>
          <div>
            <input placeholder={"찬성"} />
          </div>
          <div>
            <input placeholder={"반대"} />
          </div>
        </div>
      </WriteComponent>
      <BottomContinueBar
        title={"작성 완료"}
        clickAction={readyUpload ? handleUpload : undefined}
        fontColor={readyUpload ? palette.Background : palette.Gray1}
        buttonColor={readyUpload ? palette.Primary : palette.Gray2}
        boxColor={palette.Background}
      />
    </WriteWrap>
  );
};

export default Write;

const WriteComponent = styled.div`
  margin: 0 2.5rem;

  & select {
    background-color: rgba(0, 0, 0, 0);
    border: 0;
    width: 100%;
  }
  & .내용글자수 {
    text-align: right;
    margin-top: 0.7rem;
    color: ${palette.Text3};

    font-size: 1.2rem;
  }

  & .카테고리_투표마감시간 {
    display: flex;
    justify-content: space-between;
    & > div {
      width: 45%;
    }
  }
  & .제목입력박스 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    & input {
      width: 80%;
    }
  }
  & .입력박스 {
    border-bottom: 2px solid ${palette.Gray1};
    margin-top: 1.3rem;
  }
  & h1 {
    font-weight: 500;
    font-size: 1.2rem;
    margin-top: 3rem;
  }
  & input,
  textarea {
    font-size: 1.4rem;
    background-color: rgba(0, 0, 0, 0);
    border: 0 solid rgba(0, 0, 0, 0);
  }
  & textarea {
    width: 100%;
    height: 15rem;
    resize: none;
  }
`;

const WriteWrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
`;
