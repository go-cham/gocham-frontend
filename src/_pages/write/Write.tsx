/** @jsxImportSource @emotion/react */

import AppBar from "../../_components/common/AppBar";
import BottomContinueBar from "../../_components/common/BottomContinueBar";
import palette from "../../style/color";
import styled from "@emotion/styled";
import React, { useEffect, useMemo, useRef, useState } from "react";
import CameraIcon from "../../images/Write/Camera.svg";
import DeleteIcon from "../../images/Write/delete_icon.svg";
import Select from "react-select";
import { uploadFirebase } from "../../dataManager/firebaseManager";
import { resizeImage } from "../../dataManager/imageResizing";
import {
  categoryOptions,
  deadlineOptions,
  OptionType,
} from "../../constants/Options";
import ApiConfig, { HttpMethod } from "../../dataManager/apiConfig";
import { EndPoint } from "../../dataManager/apiMapper";
import getFutureDateTime from "../../utils/getFutureDateTime";
import { useAtomValue } from "jotai";
import { userAtom } from "../../atom/userData";
import { useNavigate } from "react-router-dom";
import { alertMessage } from "../../utils/alertMessage";
import { RouteURL } from "../../App";
import { debounce } from "lodash";

type WriteContentType = {
  title: string;
  content: string;
  category: OptionType | null;
  deadline: OptionType;
  pros: string;
  cons: string;
};

type PostWriteContentType = {
  title: string;
  content: string;
  worryCategoryId: number | undefined;
  expirationTime?: string;
  userId: number;
  choices: { label: string; sequenceNumber: number }[];
  files?: {
    url: string;
    contentType: string;
  }[];
};

const Write = () => {
  const userInfo = useAtomValue(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    // HOC로 안잡히는 부분 잡기위함
    if (userInfo.userType !== "activatedUser") navigate(RouteURL.home);
  }, []);

  const handlePostUpload = async () => {
    if (!userInfo.userId) return false;
    const expirationTime = getFutureDateTime(votingContent.deadline?.value);
    // pros cons 미 입력시
    const pros = votingContent.pros === "" ? "찬성" : votingContent.pros;
    const cons = votingContent.cons === "" ? "반대" : votingContent.cons;

    let postData: PostWriteContentType = {
      title: votingContent.title,
      userId: userInfo.userId,
      content: votingContent.content,
      worryCategoryId: votingContent.category?.value,
      choices: [
        {
          label: pros,
          sequenceNumber: 1,
        },
        {
          label: cons,
          sequenceNumber: 2,
        },
      ],
    };
    // expirationTime 이 있으면 추가. (추후 개발에서 null 인 케이스 발생 예정
    if (expirationTime) {
      postData.expirationTime = expirationTime;
    }
    // 이미지 업로드
    let imgUrl = null;
    if (imageFile !== "") {
      try {
        // 업로드 과정
        imgUrl = await uploadFirebase(userInfo.userId, imageFile, "posting");
        // postData에 끼워넣기
        postData.files = [{ url: imgUrl, contentType: "image" }];
      } catch (e) {
        console.log(e);
      }
    }

    // 포스팅 업로드
    try {
      const res = await ApiConfig.request({
        method: HttpMethod.POST,
        url: EndPoint.worry.post.WORRY,
        data: postData,
      });
      console.log(res);
      navigate(`${RouteURL.feed}/${res?.data.id}`);
    } catch (e) {
      console.log(e);
      alert(alertMessage.error.post.noUploadPermission);
    }
  };
  const debouncedHandlePushPost = debounce(handlePostUpload, 1000);
  const handlePushPost = () => {
    debouncedHandlePushPost();
  };

  const [votingContent, setVotingContent] = useState<WriteContentType>({
    title: "",
    content: "",
    category: { value: 0, label: "" },
    deadline: deadlineOptions[1],
    pros: "",
    cons: "",
  });

  const [imageFile, setImageFile] = useState("");
  const imgRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    imgRef.current?.click();
  };

  const handleImageRemove = () => {
    setImageFile("");
    (imgRef as any).current.value = ""; // 동일한 이미지를 올렸을 때, 같음 value라 onChange가 작동하지 않는 경우를 예방.
  };

  const onLoadFiles = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("working");
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files![0]);
    reader.onload = (event: ProgressEvent<FileReader>): void => {
      resizeImage(event.target?.result as string).then((result) =>
        setImageFile(result)
      );
      if (imgRef.current) {
        imgRef.current.src = event.target?.result as string;
      }
    };
  };

  useEffect(() => {
    if (
      votingContent.title !== "" &&
      votingContent.content !== "" &&
      votingContent.category?.value !== 0
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
      <WriteBox>
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
              <img
                src={CameraIcon}
                alt={"이미지선택"}
                onClick={() => handleImageClick()}
              />
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={imgRef}
                onChange={(e) => onLoadFiles(e)}
              />
            </div>
            {imageFile && (
              <div className={"유저업로드이미지영역"}>
                <div className={"유저업로드이미지상자"}>
                  <img
                    src={imageFile}
                    className={"업로드이미지"}
                    alt={"업로드 이미지"}
                  />
                  <img
                    src={DeleteIcon}
                    className={"삭제버튼"}
                    alt={"삭제버튼"}
                    onClick={() => handleImageRemove()}
                  />
                </div>
              </div>
            )}
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
            <div className={"내용글자수"}>
              {votingContent.content.length}/280
            </div>
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
                      (value): WriteContentType =>
                        ({ ...value, deadline: e } as WriteContentType)
                    )
                  }
                />
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
      </WriteBox>
      <BottomContinueBar
        title={"작성 완료"}
        clickAction={readyUpload ? handlePushPost : undefined}
        fontColor={readyUpload ? palette.Background : palette.Gray1}
        buttonColor={readyUpload ? palette.Primary : palette.Gray2}
        boxColor={palette.Background}
      />
    </WriteWrap>
  );
};

export default Write;

const WriteBox = styled.div``;

const WriteComponent = styled.div`
  margin: 4.6rem 2.5rem 0;

  & .유저업로드이미지영역 {
    margin-top: 1.5rem;
    display: flex;
    & .유저업로드이미지상자 {
      position: relative;
    }
    & .삭제버튼 {
      position: absolute;
      right: -0.8rem;
      top: -0.8rem;
    }
    & .업로드이미지 {
      max-width: 7rem;
      border-radius: 0.7rem;
      filter: drop-shadow(0px 0px 2.5rem rgba(42, 45, 55, 0.1));
    }
  }

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
  position: relative;
  height: 100vh;
  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }
  width: 100%;
  //height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  //padding-bottom: 15rem;
  //justify-content: space-between;
`;
