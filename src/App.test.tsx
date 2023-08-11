import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('test', () => {
  it('test', () => {
    render(<TestComponent message={'Testing'} />);

    expect(screen.getByText(/Testing/i)).toBeDefined();
  });
});

function TestComponent({ message }: { message: string }) {
  return <h1>{message}</h1>;
}
