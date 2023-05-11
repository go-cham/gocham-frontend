import CheckIcon from "../../../images/PostComponent/check.svg";
import FillCheckIcon from "../../../images/PostComponent/fill_check.svg";
import styled from "@emotion/styled";
import palette from "../../../style/color";
import React, { useEffect, useState } from "react";
import ApiConfig, { HttpMethod } from "../../../dataManager/apiConfig";
import { EndPoint } from "../../../dataManager/apiMapper";
import { userInfo } from "os";
import { formatRoundedNumber } from "../../../utils/formatRoundedNumber";

const PostVoteComponent = ({
  postData,
  userId,
}: {
  postData: any;
  userId: number | null;
}) => {
  const handleClickResult = async (choiceId: number) => {
    console.log(choseData);
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
    } else {
      alert("재투표가 불가능합니다!");
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
      // console.log(res.data);
      setChoiceData(res.data);
    });
    refreshVotingData();
    // if
    // 투표 한 사람이라면, 투표 통계 보여주기
    // 본인이 투표한 값 표시하기
  }, []);

  const refreshVotingData = () => {
    // 투표 여부 확인. worryId, userId 인자 둘다 넣으면 내가 투표한 값 리턴됨
    ApiConfig.request({
      method: HttpMethod.GET,
      url: EndPoint.worry.get.USER_WORRY_CHOICE,
      query: { worryId: postData.id, userId: userId },
    })?.then((res) => {
      // console.log(res?.data.worryChoice);
      if (res?.data.worryChoice.id) {
        // 내가 투표한 케이스가 있는 경우
        // console.log("chooseData", res?.data.worryChoice.id);
        setChoseData(res?.data.worryChoice.id);
        // 투표 통계 확인. worryId 인자 넣으면 투표 통계 리턴됨
        ApiConfig.request({
          method: HttpMethod.GET,
          url: EndPoint.worry.get.USER_WORRY_CHOICE,
          query: { worryId: postData.id },
        })?.then((statusData) => {
          setChoiceData(statusData.data);
          setVoteTotal(
            statusData.data.reduce((total: number, item: any) => {
              return total + item.userWorryChoiceCount;
            }, 0)
          );
        });
      }
    });
  };
  return (
    <>
      <PostVoteComponentWrap>
        {choiceData.slice(0, -1).map((value: any, idx) => {
          const percentage = (value.userWorryChoiceCount / voteTotal) * 100;
          return (
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
                  <img src={CheckIcon} alt={"체크버튼"} />
                )}
              </div>
              {voteTotal > 0 && (
                <VotePercentage
                  percentage={percentage}
                  isChoice={choseData === value?.id}
                ></VotePercentage>
              )}
            </PostVoteButton>
          );
        })}
      </PostVoteComponentWrap>
      <div className={"voting"}>
        {choiceData?.map((value: any, idx) => {
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

        <p className={"result"}>
          현재 투표한 사용자 {postData.userWorryChoiceCount}명
        </p>
      </div>
      {selectVoteButton > 0 && <ClickVoteButton>투표하기</ClickVoteButton>}
    </>
  );
};

export default PostVoteComponent;

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

const VotePercentage = styled.div<{ percentage: number; isChoice: boolean }>`
  width: ${({ percentage }) => `${percentage}%`};
  background-color: ${({ isChoice }) => {
    if (isChoice) {
      return `${palette.Primary}`;
    } else {
      return `${palette.Text2}`;
    }
  }};
  height: 4.3rem;
  border-radius: 0.5rem;
  transition: width 0.5s;
`;

const PostVoteButton = styled.div<{ percentage: number; isChoice: boolean }>`
  background-color: ${palette.Gray4};
  //width: 81vw; // 기존 34rem
  width: 100%;
  height: 4.3rem;
  margin: 1.3rem 0 0 0;
  border-radius: 0.5rem;
  color: ${({ isChoice, percentage }) => {
    if (isChoice || percentage > 0) {
      return "white";
    } else {
      return `${palette.Gray1}`;
    }
  }};
  font-size: 1.4rem;
  font-weight: 500;
  box-sizing: border-box;
  & .content {
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
