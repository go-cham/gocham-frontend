/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { type } from 'os';

export const CenterAlignDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

type ButtonProps = {
  width: number | string;
  height: number;
  size?: number;
  color?: string;
  backgroundColor?: string;
  borderRadius?: number;
  fontWeight?: number;
  border?: string;
};
export const ButtonStyle = styled.div<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => (color ? color : 'black')};
  width: ${({ width }) => {
    if (typeof width == 'number') return width + 'rem';
    if (typeof width == 'string') return width;
  }};
  height: ${({ height }) => height + 'rem'};
  font-size: ${({ size }) => size + 'rem'};
  border-radius: ${({ borderRadius }) => borderRadius + 'rem'};
  font-weight: ${({ fontWeight }): number | undefined => fontWeight};
  border: ${({ border }): string | undefined => border};
`;

export const FlexRowDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const FlexColumnDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
