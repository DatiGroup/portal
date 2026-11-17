import React, {  } from 'react';
import { RemoteAppBoundary } from 'components/RemoteAppBoundary';
import { SharedDataGrid } from 'components/tables/sharedDataGrid/SharedDataGrid';
import { tokenStorage } from 'utils/tokenUtils';

const RemoteWidgetApp = React.lazy(() => import('widgetRegistryApp/WidgetApp'));

const WidgetRegistryView = () => {
  const accessToken = tokenStorage.getAccessToken();

  return (
    <RemoteAppBoundary name="Widget Registry">
      <RemoteWidgetApp SharedDataGrid={SharedDataGrid} token={accessToken} />
    </RemoteAppBoundary>
  );
};

export default WidgetRegistryView;
