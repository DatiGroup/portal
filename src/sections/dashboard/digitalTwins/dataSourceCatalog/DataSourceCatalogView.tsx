import React, {  } from 'react';
import { RemoteAppBoundary } from 'components/RemoteAppBoundary';
import { SharedDataGrid } from 'components/tables/sharedDataGrid/SharedDataGrid';

// Lazy-load the remote Data Source Catalog app
const RemoteApp = React.lazy(() => import('dataSourceCatalogApp/DataSourceCatalogApp'));

const DataSourceCatalogView: React.FC = () => {
  return (
    <RemoteAppBoundary name="Data Source Catalog">
      <RemoteApp basename="/portal-web/data-source-catalog-web" SharedDataGrid={SharedDataGrid} />
    </RemoteAppBoundary>
  );
};

export default DataSourceCatalogView;
