import { RenderOptions, render } from '@testing-library/react';

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => children,
    ...options,
  });

export { customRender as render };
