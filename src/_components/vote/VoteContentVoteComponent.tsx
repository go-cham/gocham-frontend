/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import palette from '@/style/color';
import styled from '@emotion/styled';
import { CenterAlignDiv } from '@/style/common';

const VoteContentVoteComponent = () => {
  return (
    <section css={VoteSection}>
      <VoteBox option={'YES'}>
        <>찬성</>
      </VoteBox>
      <VoteBox option={'NO'}>
        <>반대</>
      </VoteBox>{' '}
      <WantResultBox>
        <>
          결과만
          <br />
          볼래요
        </>
      </WantResultBox>
    </section>
  );
};

export default VoteContentVoteComponent;

const WantResultBox = styled(CenterAlignDiv)`
  width: 5.9rem;
  height: 5.9rem;
  font-weight: 500;
  font-size: 1.2rem;
  color: ${palette.Text3};
  background-color: ${palette.Gray3};
  border-radius: 1.2rem;
`;

const VoteBox = styled(CenterAlignDiv)<{ option: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.8rem;
  height: 5.9rem;
  width: 12.5rem;
  background: ${({ option }) => (option == 'YES' ? palette.Primary : 'black')};
`;

const VoteSection = css`
  width: 32.2rem;
  position: absolute;
  bottom: 1rem;
  display: flex;
  justify-content: space-between;
`;
