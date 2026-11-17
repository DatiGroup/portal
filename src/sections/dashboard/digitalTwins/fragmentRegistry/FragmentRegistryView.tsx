import React, {  } from 'react';
import { RemoteAppBoundary } from 'components/RemoteAppBoundary';
// import keycloak from '../auth/keycloak';
import { SharedDataGrid } from 'components/tables/sharedDataGrid/SharedDataGrid';
import useAuth from 'sections/auth/hooks/useAuth';
import { tokenStorage } from 'utils/tokenUtils';

const RemoteFragmentApp = React.lazy(() => import('fragmentRegistryApp/FragmentApp'));

const FragmentRegistryView = () => {
  const { isInitialized, isLoggedIn } = useAuth();
  const accessToken = tokenStorage.getAccessToken();

  //   if (!isInitialized) return <div>Signing you in…</div>;
  //   if (!isLoggedIn) return null;

  return (
    <RemoteAppBoundary name="Fragment Registry">
      <RemoteFragmentApp SharedDataGrid={SharedDataGrid} token={accessToken} />
    </RemoteAppBoundary>
  );
};

export default FragmentRegistryView;
