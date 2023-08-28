import GlobalErrorBoundary from '@/app/GlobalErrorBoundary';
import Provider from '@/app/Provider';
import Routes from '@/app/Routes';
import RootLayout from '@/common/components/layout/RootLayout';
import IosInstallGuide from '@/common/components/system/IosInstallGuide';
import UpdateBanner from '@/common/components/system/UpdateBanner';

export default function App() {
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
