import CheckIcon from "../../../images/PostComponent/check.svg";
import styled from "@emotion/styled";
import palette from "../../../style/color";
import React, { useEffect, useState } from "react";
import ApiConfig, { HttpMethod } from "../../../dataManager/apiConfig";
import { EndPoint } from "../../../dataManager/apiMapper";

const PostVoteComponent = ({
  postData,
  userId,
}: {
  postData: any;
  userId: number | null;
}) => {
  const handleClickResult = async (choiceId: number) => {
    console.log(userId, choiceId);
    const res = await ApiConfig.request({
      method: HttpMethod.POST,
      url: EndPoint.worry.post.USER_WORRY_CHOICE,
      data: {
        userId: userId,
        worryChoiceId: choiceId,
      },
    });

    console.log(res);
  };

  const [choiceDate, setChoiceDate] = useState([]);

  useEffect(() => {
    //   투표값 조회
    ApiConfig.request({
      method: HttpMethod.GET,
      url: EndPoint.worry.get.WORRY_CHOICES,
      query: { worryId: postData.id },
    })?.then((res) => {
      // console.log(res.data);
      setChoiceDate(res.data);
    });
    // setChoiceDate()
  }, []);
  return (
    <>
      <PostVoteComponentWrap>
        {choiceDate.slice(0, -1).map((value: any, idx) => (
          <PostVoteButton key={idx} onClick={() => handleClickResult(value.id)}>
            <div>{value?.label}</div>
            <img src={CheckIcon} alt={"체크버튼"} />
          </PostVoteButton>
        ))}
      </PostVoteComponentWrap>
      <div className={"voting"}>
        {choiceDate?.map((value: any, idx) => {
          // 배열의 마지막 요소인 경우에만 렌더링
          if (idx === choiceDate.length - 1) {
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
    </>
  );
};

export default PostVoteComponent;

const PostVoteButton = styled.div`
  background-color: ${palette.Gray4};
  //width: 81vw; // 기존 34rem
  height: 4.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 0.9rem;
  padding-left: 1.3rem;
  margin: 1.3rem 0 0 0;
  border-radius: 0.5rem;
  color: ${palette.Gray1};
  font-size: 1.4rem;
  font-weight: 500;
`;

const PostVoteComponentWrap = styled.div`
  margin-top: 1.3rem;
  margin-bottom: 1.7rem;
`;
