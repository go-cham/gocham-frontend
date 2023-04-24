/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import AppBar from "../../_components/common/AppBar";
import BottomContinueBar from "../../_components/common/BottomContinueBar";
import palette from "../../style/color";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
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
    // api 연동시 pros cons 미설정시 찬성 반대 가 입력되도록 해야함.
  };

  const [votingContent, setVotingContent] = useState<WriteContentType>({
    title: "",
    content: "",
    category: "1",
    deadline: "",
    pros: "",
    cons: "",
  });

  useEffect(() => {
    if (
      votingContent.title !== "" &&
      votingContent.content !== "" &&
      votingContent.category !== ""
    )
      setReadyUpload(true);
  }, [votingContent]);

  const [readyUpload, setReadyUpload] = useState(false);
  return (
    <WriteWrap>
      <AppBar title={"글 작성"} />
      <WriteComponent>
        <div className={"글제목"}>
          <h1>글 제목</h1>
          <div className={"제목입력박스 입력박스"}>
            <input
              placeholder={"제목 작성 또는 이미지 선택"}
              value={votingContent.title}
              onChange={(e) => {
                setVotingContent((value) => ({
                  ...value,
                  title: e.target.value,
                }));
              }}
            />
            <img src={CameraIcon} alt={"이미지선택"} />
          </div>
        </div>
        <div className={"글내용"}>
          <h1>내용</h1>
          <div className={"입력박스"}>
            <textarea
              placeholder={"최대 280자 입력"}
              value={votingContent.content}
              onChange={(e) => {
                setVotingContent((value) => ({
                  ...value,
                  content: e.target.value,
                }));
              }}
            />
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
          <br />
          <h2>아래의 옵션을 눌러서 원하는 텍스트로 변경할 수 있어요.</h2>
          <br />
          <div className={"의견입력박스"}>
            <div className={"pros"}>
              <input
                placeholder={"찬성"}
                maxLength={6}
                value={votingContent.pros}
                onChange={(e) => {
                  setVotingContent((value) => ({
                    ...value,
                    pros: e.target.value,
                  }));
                }}
              />
            </div>
            <div className={"cons"}>
              <input
                placeholder={"반대"}
                maxLength={6}
                value={votingContent.cons}
                onChange={(e) => {
                  setVotingContent((value) => ({
                    ...value,
                    cons: e.target.value,
                  }));
                }}
              />
            </div>
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

  & h2 {
    font-size: 1.2rem;
    font-weight: 400;
    color: ${palette.Text3};
  }
  & .의견입력박스 {
    display: flex;
    & > div {
      width: 49%;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 6rem;
      border-radius: 12px;
      margin-right: 0.4rem;
    }
    & .pros {
      border: 1px dashed ${palette.Primary};
      & input {
        color: ${palette.Primary};
      }
      & input::placeholder {
        color: ${palette.Primary};
      }
    }
    & .cons {
      border: 1px dashed ${palette.Secondary};
      & input {
        color: ${palette.Secondary};
      }
      & input::placeholder {
        color: ${palette.Secondary};
      }
    }
    & input {
      text-align: center;
      font-weight: 700;
      font-size: 1.8rem;
    }
  }
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
