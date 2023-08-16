import { RootLayout } from '@/common/components/layout';
import { IosInstallGuide, UpdateBanner } from '@/common/components/system';
import { useRouteChangeTracker } from '@/common/hooks/useRouteChangeTracker';
import { useUpdate } from '@/common/hooks/useUpdate';
import { GlobalErrorBoundary } from './GlobalErrorBoundary';
import { Provider } from './Provider';
import Routes from './Routes';

export function App() {
  const { showUpdate, applyUpdate } = useUpdate();
  useRouteChangeTracker();

  return (
    <Provider>
      <RootLayout>
        <GlobalErrorBoundary>
          {showUpdate && <UpdateBanner applyUpdate={applyUpdate} />}
          <IosInstallGuide />
          <Routes />
        </GlobalErrorBoundary>
      </RootLayout>
    </Provider>
  );
}
