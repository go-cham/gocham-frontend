import React from 'react';

/**
 * 서버에서 입력받는 값의 \n을 정상 띄어쓰기로 치횐해줌.
 * @param text
 */
export function formatText(text: string | undefined) {
  if (text === undefined) return '';
  return text.split('\n').map((line, idx) => (
    <React.Fragment key={idx}>
      {line}
      <br />
    </React.Fragment>
  ));
}
