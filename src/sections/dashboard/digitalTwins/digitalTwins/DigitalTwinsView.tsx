import React, { useEffect, useState } from 'react';
import { RemoteAppBoundary } from 'components/RemoteAppBoundary';
import useAuth from 'sections/auth/hooks/useAuth';
import { tokenStorage } from 'utils/tokenUtils';

const RemoteDigitalTwinApp = React.lazy(() => import('digitalTwinApp/DigitalTwinApp'));

export default function DigitalTwinsView() {
  const { isInitialized, isLoggedIn } = useAuth();
  const accessToken = tokenStorage.getAccessToken();

  // if (!isInitialized) return <div>Signing you in…</div>;
  // if (!isLoggedIn) return null;

  return (
    <RemoteAppBoundary name="Digital Twins">
      <RemoteDigitalTwinApp token={accessToken} />
    </RemoteAppBoundary>
  );
}
