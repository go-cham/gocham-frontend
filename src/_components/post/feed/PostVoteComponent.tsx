import FillCheckIcon from "../../../images/PostComponent/fill_check.svg";
import styled from "@emotion/styled";
import palette from "../../../style/color";
import React, { useEffect, useState } from "react";
import ApiConfig, { HttpMethod } from "../../../dataManager/apiConfig";
import { EndPoint } from "../../../dataManager/apiMapper";
import { formatRoundedNumber } from "../../../utils/formatRoundedNumber";
import ChatIcon from "../../../images/PostComponent/chat.svg";
import ShareIcon from "../../../images/PostComponent/share.svg";
import ChatAlertImage from "../../../images/PostComponent/share_image.svg";
import { useAtom } from "jotai";
import { chatInputFocusAtom } from "../../../atom/chatInputFocus";
import { RouteURL } from "../../../App";
import { refreshChatAtom } from "../../../atom/postRefreshRequest";
import { getRemainingTime } from "../../../utils/getRemainingTime";

const PostVoteComponent = ({
  postData,
  userId,
  handleClickPostChat,
}: {
  postData: any;
  userId: number | null;
  handleClickPostChat: () => void;
}) => {
  const [needRefresh, setNeedRefresh] = useAtom(refreshChatAtom);

  const handleClickResult = async (choiceId: number) => {
    // 마감된 투표글인지 확인 필요
    if (getRemainingTime(postData.expirationTime) !== "마감됨") {
      if (choseData === 0) {
        const res = await ApiConfig.request({
          method: HttpMethod.POST,
          url: EndPoint.worry.post.USER_WORRY_CHOICE,
          data: {
            userId: userId,
            worryChoiceId: choiceId,
          },
        });
        refreshVotingData();
        // 투표후 투표한 사용자수 리프레시
        setNeedRefresh({
          worryIdx: postData.id,
          updateObject: "vote",
        });
      } else {
        alert("재투표가 불가능합니다!");
      }
    } else {
      alert("마감된 게시글은 투표가 불가능합니다!");
    }
  };
  // 선택할 수 있는 값
  const [choiceData, setChoiceData] = useState([]);
  // 내가 선택한 값
  const [choseData, setChoseData] = useState(0);
  // 투표된 값의 전체
  const [voteTotal, setVoteTotal] = useState(0);
  // 특정 투표값을 클릭했는지 여부
  const [selectVoteButton, setSelectVoteButton] = useState(0);

  useEffect(() => {
    //   투표값 조회
    ApiConfig.request({
      method: HttpMethod.GET,
      url: EndPoint.worry.get.WORRY_CHOICES,
      query: { worryId: postData.id },
    })?.then((res) => {
      setChoiceData(res.data);
    });
    refreshVotingData();
  }, []);

  const [chatInputFocus, setChatInputFocus] = useAtom(chatInputFocusAtom);

  const handleClickPostChatWithFocus = () => {
    setChatInputFocus({ worryId: postData.id });
    handleClickPostChat();
  };
  const refreshVotingData = () => {
    // 투표 여부 확인. worryId, userId 인자 둘다 넣으면 내가 투표한 값 리턴됨
    ApiConfig.request({
      method: HttpMethod.GET,
      url: EndPoint.worry.get.USER_WORRY_CHOICE,
      query: { worryId: postData.id, userId: userId },
    })?.then((res) => {
      if (res?.data.worryChoice.id) {
        // 내가 투표한 케이스가 있는 경우
        setChoseData(res?.data.worryChoice.id);
        // 투표 통계 확인. worryId 인자 넣으면 투표 통계 리턴됨
        ApiConfig.request({
          method: HttpMethod.GET,
          url: EndPoint.worry.get.USER_WORRY_CHOICE,
          query: { worryId: postData.id },
        })?.then((statusData) => {
          setChoiceData(statusData.data);
          setVoteTotal(
            statusData.data.slice(0, -1).reduce((total: number, item: any) => {
              return total + item.userWorryChoiceCount;
            }, 0)
          );
        });

        // 새로고침 로직 필요
      }
    });
  };
  const [alertShare, setAlertShare] = useState(false);

  const [display, setDisplay] = useState("none");

  useEffect(() => {
    if (alertShare) {
      setDisplay("flex");
    } else {
      const timeoutId = setTimeout(() => {
        setDisplay("none");
      }, 500); // transition의 시간과 일치해야 합니다.
      return () => clearTimeout(timeoutId);
    }
  }, [alertShare]);
  const handleClickShare = async (postId: number) => {
    // https 배포에서만 확인 가능.
    try {
      await navigator.share({
        title: "고민의 참견",
        url: `${process.env.REACT_APP_BASE_URL}${RouteURL.feed}/${postId}`,
      });
      console.log("링크가 공유되었습니다.");
      setAlertShare(true);
      setTimeout(() => {
        setAlertShare(false);
      }, 3000);
    } catch (error) {
      console.error("링크 공유 에러", error);
    }
  };

  return (
    <>
      <PostVoteComponentWrap>
        {choiceData.slice(0, -1).map((value: any, idx) => {
          const percentage = (value.userWorryChoiceCount / voteTotal) * 100;
          return (
            <PostVoteButtonWrap>
              <PostVoteButton
                isChoice={choseData === value?.id}
                percentage={percentage}
                key={idx}
                onClick={() => handleClickResult(value.id)}
              >
                <div className={"content"}>
                  <div>
                    {value?.label}
                    {percentage !== 0 &&
                      !isNaN(percentage) &&
                      `(${formatRoundedNumber(percentage)}%)`}
                  </div>
                  {choseData === value?.id ? (
                    <img src={FillCheckIcon} alt={"체크버튼"} />
                  ) : (
                    <></>
                  )}
                </div>
              </PostVoteButton>
              {voteTotal > 0 && (
                <VotePercentage
                  percentage={percentage}
                  isChoice={choseData === value?.id}
                ></VotePercentage>
              )}
            </PostVoteButtonWrap>
          );
        })}
      </PostVoteComponentWrap>
      <ToolWrap>
        <div className={"voting"}>
          <div className={"toolbar"}>
            <img
              src={ChatIcon}
              alt={"댓글"}
              onClick={() => handleClickPostChatWithFocus()}
            />
            <img
              src={ShareIcon}
              alt={"공유"}
              onClick={() => handleClickShare(postData.id)}
            />
            <SharePostAlert alertShare={alertShare} display={display}>
              <img src={ChatAlertImage} alt={"모달"} />
              <p>게시물 링크가 복사되었어요!</p>
            </SharePostAlert>
          </div>
          {choseData === 0 &&
            choiceData?.map((value: any, idx) => {
              // 배열의 마지막 요소인 경우에만 렌더링
              if (idx === choiceData.length - 1) {
                return (
                  <p
                    className={"justResult"}
                    onClick={() => handleClickResult(value.id)}
                    key={idx}
                  >
                    결과만 볼래요
                  </p>
                );
              } else {
                return null;
              }
            })}
        </div>
      </ToolWrap>
      {selectVoteButton > 0 && <ClickVoteButton>투표하기</ClickVoteButton>}
    </>
  );
};

export default PostVoteComponent;

const ToolWrap = styled.div`
  & .voting {
    display: flex;
    align-items: center;
    position: relative;
    & .justResult {
      text-decoration-line: underline;
      font-size: 1.2rem;
      position: absolute;
      right: 0;
      color: ${palette.Text2};
    }
  }
`;

const SharePostAlert = styled.div<{ alertShare: boolean; display: string }>`
  display: ${({ display }) => display};
  opacity: ${({ alertShare }) => (alertShare ? "1" : "0")};
  z-index: 10;

  transition: all 0.5s ease-in-out;
  position: absolute;
  top: -3rem;
  left: 3.5rem;
  justify-content: center;
  align-items: center;
  & img {
    position: absolute;
  }
  & p {
    z-index: 11;
    margin-bottom: 0.8rem;
    //width: 16.2rem;
    //height: 4.4rem;
    font-weight: 700;
    font-size: 1.2rem;
    color: white;
  }
`;

const ClickVoteButton = styled.div`
  width: 34rem;
  height: 4.7rem;
  background-color: ${palette.Secondary};
  margin: 0 auto;
  position: absolute;
  bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 10rem;
  font-weight: 700;
  font-size: 1.6rem;
  color: white;
  //bottom: 0.5rem;
`;

const PostVoteButtonWrap = styled.div`
  position: relative;
  height: 4.3rem;
  margin: 1.3rem 0 0 0;
`;

const VotePercentage = styled.div<{ percentage: number; isChoice: boolean }>`
  position: absolute;
  top: 0;
  width: ${({ percentage }) => `${percentage}%`};
  background-color: ${palette.Secondary};
  height: 4.3rem;
  border-radius: 0.5rem;
  transition: width 0.5s;
`;

const PostVoteButton = styled.div<{ percentage: number; isChoice: boolean }>`
  background-color: white;
  //width: 81vw; // 기존 34rem
  width: 100%;
  height: 4.3rem;
  border-radius: 0.5rem;
  color: ${({ isChoice, percentage }) => {
    if (isChoice || percentage > 0) {
      return "white";
    } else {
      return "black";
    }
  }};
  font-size: 1.4rem;
  font-weight: 500;
  box-sizing: border-box;
  border: 0.1rem solid ${palette.Secondary};
  & .content {
    z-index: 5;
    padding-right: 0.9rem;
    padding-left: 1.3rem;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4.3rem;
    width: 98%;
    box-sizing: border-box;
  }
`;

const PostVoteComponentWrap = styled.div`
  margin-top: 1.3rem;
  margin-bottom: 1.7rem;
  position: relative;
  width: 100%;
`;
