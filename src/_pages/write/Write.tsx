/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import AppBar from "../../_components/common/AppBar";
import BottomContinueBar from "../../_components/common/BottomContinueBar";
import palette from "../../style/color";
import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
import CameraIcon from "../../images/Write/Camera.svg";
import Select from "react-select";

type WriteContentType = {
  title: string;
  content: string;
  category: OptionType | null;
  deadline: OptionType | null;
  pros: string;
  cons: string;
};

type OptionType = {
  value: string;
  label: string;
};

const categoryOptions: OptionType[] = [
  { value: "교육, 학문", label: "교육, 학문" },
  { value: "컴퓨터통신", label: "컴퓨터통신" },
  { value: "게임", label: "게임" },
  { value: "엔터테인먼트, 예술", label: "엔터테인먼트, 예술" },
  { value: "생활", label: "생활" },
  { value: "건강", label: "건강" },
  { value: "사회, 정치", label: "사회, 정치" },
  { value: "경제", label: "경제" },
  { value: "여행", label: "여행" },
  { value: "스포츠, 운동", label: "스포츠, 운동" },
  { value: "쇼핑", label: "쇼핑" },
  { value: "지역", label: "지역" },
  { value: "연애, 결혼", label: "연애, 결혼" },
  { value: "음악, 연주", label: "음악, 연주" },
  { value: "요리", label: "요리" },
  { value: "쇼핑", label: "쇼핑" },
  { value: "방송, 연예인", label: "방송, 연예인" },
  { value: "피부과", label: "피부과" },
  { value: "반려동물", label: "반려동물" },
];

const deadlineOptions: OptionType[] = [
  { value: "3", label: "3시간 후 마감" },
  { value: "6", label: "6시간 후 마감" },
  { value: "12", label: "12시간 후 마감" },
  { value: "24", label: "24시간 후 마감" },
];

const Write = () => {
  const handleUpload = async () => {
    console.log(votingContent);
    // api 연동시 pros cons 미설정시 찬성 반대 가 입력되도록 해야함.
  };

  const [votingContent, setVotingContent] = useState<WriteContentType>({
    title: "",
    content: "",
    category: { value: "", label: "" },
    deadline: deadlineOptions[1],
    pros: "",
    cons: "",
  });

  useEffect(() => {
    if (
      votingContent.title !== "" &&
      votingContent.content !== "" &&
      votingContent.category !== null
    )
      setReadyUpload(true);
  }, [votingContent]);

  const customStyles = useMemo(
    () => ({
      option: (provided: any, state: any) => ({
        ...provided,
        // border: "5px dotted red",
        textAlign: "left",
        backgroundColor: null,
        fontSize: "1.2rem",
        color: "rgba(42, 45, 55, 0.7)",
        // height: "2rem",
      }),
      control: (provided: any, state: any) => ({
        ...provided,
        // width: 200,
        background: "rgba(0,0,0,0)",
        border: 0,
        boxSizing: "border-box",
        boxShadow: null,
        borderColor: null,
        fontSize: "1.2rem",
        color: "rgba(42, 45, 55, 0.7)",
        borderRadius: 0,
        transition: "border-width 0.1s ease-in-out",
        borderBottom: state.isFocused
          ? `0.4rem solid ${palette.Gray1}`
          : `0.2rem solid ${palette.Gray1}`,
      }),
      singleValue: (provided: any, state: any) => ({
        ...provided,
        color: palette.Secondary,
        fontSize: "1.2rem",
        fontWeight: "500",
      }),
      menu: (provided: any, state: any) => ({
        ...provided,
        borderRadius: "1.2rem",
      }),
      menuList: (provided: any, state: any) => ({
        ...provided,
        maxHeight: "15rem",
      }),
    }),
    []
  );

  const [readyUpload, setReadyUpload] = useState(false);
  return (
    <WriteWrap>
      <AppBar title={"글 작성"} />
      <WriteComponent>
        <div className={"글제목"}>
          <h1>글 제목</h1>
          <div className={"제목입력박스 입력박스"}>
            <textarea
              maxLength={16}
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
          <div className={"내용입력박스 입력박스"}>
            <textarea
              maxLength={280}
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
              <Select
                isSearchable={false}
                styles={customStyles}
                options={categoryOptions}
                value={votingContent.category}
                onChange={(e) =>
                  setVotingContent(
                    (value): WriteContentType => ({ ...value, category: e })
                  )
                }
              />
            </div>
          </div>
          <div>
            <h1>투표 마감 시간</h1>
            <div className={"입력박스"}>
              <Select
                isSearchable={false}
                styles={customStyles}
                options={deadlineOptions}
                value={votingContent.deadline}
                onChange={(e) =>
                  setVotingContent(
                    (value): WriteContentType => ({ ...value, deadline: e })
                  )
                }
              />{" "}
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
        border: 0 solid rgba(0, 0, 0, 0);
      }
      & input::placeholder {
        color: ${palette.Primary};
      }
    }
    & .cons {
      border: 1px dashed ${palette.Secondary};
      & input {
        color: ${palette.Secondary};
        border: 0 solid rgba(0, 0, 0, 0);
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
      //box-sizing: border-box;
      height: 10rem;
    }
  }
  & .제목입력박스 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    & textarea {
      width: 100%;
      height: 4rem;
      box-sizing: border-box;
      //vertical-align: middle;
      line-height: 3rem;
    }
    & img {
      position: absolute;
      right: 1rem;
      top: -0.4rem;
    }
  }
  & .입력박스 {
    margin-top: 1.3rem;
  }
  & .입력박스 :focus {
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
    border-bottom: 0.2rem solid ${palette.Gray1};
    box-sizing: border-box;
    transition: border-width 0.1s ease-in-out;
  }
  & input:focus,
  textarea:focus {
    border-bottom: 0.4rem solid ${palette.Gray1};
  }
  & .내용입력박스 {
    & > textarea {
      height: 15rem;
    }
  }
  & textarea {
    width: 100%;
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
