import { ErrorBoundary } from 'react-error-boundary';

export function GlobalErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary
      fallback={<h1>error!!</h1>}
      onError={(error) => console.log(error)}
    >
      {children}
    </ErrorBoundary>
  );
}
