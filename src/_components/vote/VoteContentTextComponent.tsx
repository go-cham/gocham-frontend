/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import react from 'react';

const VoteContentTextComponent = () => {
  return (
    <span css={TextComponenetCss}>
      여러분들의 질문거리를 남겨주세요! 여러분들의 질문거리를 남겨주세요!
      여러분들의 질문거리를 남겨주세요! 여러분들의 질문거리를 남겨주세요!
    </span>
  );
};

export default VoteContentTextComponent;

const TextComponenetCss = css`
  font-size: 14px;
  line-height: 21px;
`;
