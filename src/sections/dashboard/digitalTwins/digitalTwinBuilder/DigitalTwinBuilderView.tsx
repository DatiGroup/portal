import React, {  } from 'react';
import { RemoteAppBoundary } from 'components/RemoteAppBoundary';
import useAuth from 'sections/auth/hooks/useAuth'; // <-- portalweb auth
import { SharedDataGrid } from 'components/tables/sharedDataGrid/SharedDataGrid';
import { tokenStorage } from 'utils/tokenUtils';

const RemoteDigitalTwinBuilderApp = React.lazy(() => import('digitalTwinBuilderApp/DigitalTwinBuilderApp'));

const DigitalTwinBuilderView = () => {
  const { isInitialized, isLoggedIn } = useAuth();
  const accessToken = tokenStorage.getAccessToken();

  if (!isInitialized) return <div>Signing you in…</div>;
  if (!isLoggedIn) return null;

  return (
    <RemoteAppBoundary name="Digital Twin Builder">
      <RemoteDigitalTwinBuilderApp
        SharedDataGrid={SharedDataGrid}
        authToken={accessToken} // <-- pass token
      />
    </RemoteAppBoundary>
  );
};

export default DigitalTwinBuilderView;
