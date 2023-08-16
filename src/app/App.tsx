import { ErrorBoundary } from 'react-error-boundary';
import { RootLayout } from '@/common/components/layout';
import { IosInstallGuide } from '@/common/components/system';
import { UpdateBanner } from '@/common/components/system';
import { useRouteChangeTracker } from '@/common/hooks/useRouteChangeTracker';
import { useUpdate } from '@/common/hooks/useUpdate';
import Routes from './Routes';

export function App() {
  const { showUpdate, applyUpdate } = useUpdate();
  useRouteChangeTracker();

  return (
    <RootLayout>
      <ErrorBoundary
        fallback={<h1>error!!</h1>}
        onError={(error) => console.log(error)}
      >
        <UpdateBanner show={showUpdate} applyUpdate={applyUpdate} />
        <IosInstallGuide />
        <Routes />
      </ErrorBoundary>
    </RootLayout>
  );
}
