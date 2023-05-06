import CheckIcon from "../../../images/PostComponent/check.svg";
import styled from "@emotion/styled";
import palette from "../../../style/color";

const PostVoteComponent = ({ postId }: { postId: number }) => {
  return (
    <>
      <PostVoteComponentWrap>
        <PostVoteButton>
          <div>슬랙스</div>
          <img src={CheckIcon} alt={"체크버튼"} />
        </PostVoteButton>
        <PostVoteButton>
          <div>청바지</div>
          <img src={CheckIcon} alt={"체크버튼"} />
        </PostVoteButton>
      </PostVoteComponentWrap>
    </>
  );
};

export default PostVoteComponent;

const PostVoteButton = styled.div`
  background-color: ${palette.Gray4};
  width: 81vw; // 기존 34rem
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
