import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '@/common/components/layout/PageWrapper';
import Button from '@/common/components/ui/buttons/Button';
import { ReactComponent as ErrorPageLogo } from './error-logo.svg';

export default function GlobalErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorPage}
      onError={(error) => console.error(error)}
    >
      {children}
    </ErrorBoundary>
  );
}

function ErrorPage({ resetErrorBoundary }: FallbackProps) {
  const navigate = useNavigate();

  const handleRefresh = () => {
    resetErrorBoundary();
  };

  const handleGoHome = () => {
    navigate('/');
    resetErrorBoundary();
  };

  return (
    <PageWrapper className={'relative top-[25%]'}>
      <ErrorPageLogo className={'mx-auto'} />
      <div className={'mx-auto mt-[2.5rem] space-y-[0.9rem] text-center'}>
        <h1 className={'font-custom-heading1'}>에러가 발생하였어요!</h1>
        <p className={'text-text-explain-500 font-system-body3'}>
          예상치 못한 오류로 이 서비스와 연결할 수 없습니다.
        </p>
      </div>
      <div className={'mt-[2.5rem] flex space-x-[1rem] px-[4.2rem]'}>
        <Button
          className={
            'border border-background-dividerLine-300 bg-transparent text-text-explain-500 font-system-body3 hover:bg-white active:bg-white'
          }
          onClick={handleRefresh}
        >
          새로고침
        </Button>
        <Button className={'font-system-body3'} onClick={handleGoHome}>
          메인 홈으로 이동
        </Button>
      </div>
    </PageWrapper>
  );
}
