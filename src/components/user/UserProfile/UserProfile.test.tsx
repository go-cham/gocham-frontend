import { expect, it } from 'vitest';

import UserProfile from '@/components/user/UserProfile/UserProfile';
import { render, screen } from '@/test/test-utils';

it('나이대와 닉네임 표시', () => {
  render(<UserProfile nickname={'테스트닉네임'} age={24} isAdmin={false} />);

  const nickname = screen.getByText('테스트닉네임');
  const ageRange = screen.getByText('20');

  expect(nickname).toBeDefined();
  expect(ageRange).toBeDefined();
});

it('50대 이상은 40+로 표기', () => {
  render(<UserProfile nickname={'테스트닉네임'} age={51} isAdmin={false} />);

  const ageRange = screen.getByText('40+');

  expect(ageRange).toBeDefined();
});

it('관리자는 나이대 대신 이미지 표시', () => {
  render(<UserProfile nickname={'테스트닉네임'} age={23} isAdmin={true} />);

  const ageRange = screen.queryByText('20');
  const image = screen.getByAltText('관리자 로고');

  expect(ageRange).not.toBeInTheDocument();
  expect(image).toBeInTheDocument();
});
