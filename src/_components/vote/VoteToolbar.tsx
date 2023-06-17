/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import EmptyHeartIcon from '@/images/VoteComponent/empty_heart_icon.png';
import EmptyChatIcon from '@/images/VoteComponent/empty_chat_icon.png';
import EmptyShareIcon from '@/images/VoteComponent/empty_share_icon.png';
import palette from '@/style/color';

const VoteToolbar = () => {
  return (
    <section css={VoteToolBarCss}>
      <div>
        <img src={EmptyHeartIcon} alt={'공감'} />
        <img src={EmptyChatIcon} alt={'채팅'} />
        <img src={EmptyShareIcon} alt={'공유'} />
      </div>
      <div className={'voteCount'}>현재 투표한 사용자 1,000명</div>
    </section>
  );
};
export default VoteToolbar;

const VoteToolBarCss = css`
  display: flex;
  margin-bottom: 1.3rem;
  justify-content: space-between;
  align-items: center;

  & > .voteCount {
    margin-right: 0.3rem;
    font-size: 1.2rem;
    color: ${palette.Text3};
  }
`;
