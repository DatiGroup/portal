import React, {  } from 'react';
import { RemoteAppBoundary } from 'components/RemoteAppBoundary';
import { SharedDataGrid } from 'components/tables/sharedDataGrid/SharedDataGrid';
import useAuth from 'sections/auth/hooks/useAuth';
import { tokenStorage } from 'utils/tokenUtils';

// Lazy-load the remote Data Source Catalog app
const RemoteApp = React.lazy(() => import('simulationModelRegistryApp/SimulationModelRegistryApp'));

const SimulationModelRegistryView: React.FC = () => {
  const { isInitialized, isLoggedIn } = useAuth();
  const accessToken = tokenStorage.getAccessToken();

  if (!isInitialized) return <div>Signing you in…</div>;
  if (!isLoggedIn) return null;

  return (
    <RemoteAppBoundary name="Simulation Model Registry">
      <RemoteApp basename="/portal-web/simulation-model-registry-web" SharedDataGrid={SharedDataGrid} token={accessToken} />
    </RemoteAppBoundary>
  );
};

export default SimulationModelRegistryView;
