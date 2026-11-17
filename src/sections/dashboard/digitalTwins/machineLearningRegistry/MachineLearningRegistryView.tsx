import { SharedDataGrid } from 'components/tables/sharedDataGrid/SharedDataGrid';
import React, { useEffect, useState } from 'react';
import { RemoteAppBoundary } from 'components/RemoteAppBoundary';
import useAuth from 'sections/auth/hooks/useAuth';
import { tokenStorage } from 'utils/tokenUtils';

const RemoteMachineLearningModelApp = React.lazy(() => import('machineLearningModelApp/MachineLearningModelApp'));

const MachineLearningRegistryView: React.FC = () => {
  const { isInitialized, isLoggedIn } = useAuth();
  const accessToken = tokenStorage.getAccessToken();

  if (!isInitialized) return <div>Signing you in…</div>;
  if (!isLoggedIn) return null;

  return (
    <RemoteAppBoundary name="Machine Learning Registry">
      <RemoteMachineLearningModelApp SharedDataGrid={SharedDataGrid} token={accessToken} />
    </RemoteAppBoundary>
  );
};

export default MachineLearningRegistryView;
