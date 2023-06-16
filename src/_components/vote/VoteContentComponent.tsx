/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import React from 'react';
import VoteToolbar from './VoteToolbar';
import VoteContentTextComponent from './VoteContentTextComponent';
import VoteContentVoteComponent from './VoteContentVoteComponent';

const VoteContentCss = css`
  height: 22.6rem;
  margin: 1.1rem 0.9rem;
  & > .Content {
    margin: 0 0.4rem;
  }
`;
const VoteContentComponent = () => {
  return (
    <div css={VoteContentCss}>
      <div className={'Content'}>
        <VoteToolbar />
        <VoteContentTextComponent />
      </div>
      <VoteContentVoteComponent />
    </div>
  );
};

export default VoteContentComponent;
