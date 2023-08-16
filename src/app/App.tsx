import { RootLayout } from '@/common/components/layout';
import { IosInstallGuide, UpdateBanner } from '@/common/components/system';
import { useRouteChangeTracker } from '@/common/hooks/useRouteChangeTracker';
import { GlobalErrorBoundary } from './GlobalErrorBoundary';
import { Provider } from './Provider';
import Routes from './Routes';

export function App() {
  useRouteChangeTracker();

  return (
    <Provider>
      <RootLayout>
        <GlobalErrorBoundary>
          <UpdateBanner />
          <IosInstallGuide />
          <Routes />
        </GlobalErrorBoundary>
      </RootLayout>
    </Provider>
  );
}
