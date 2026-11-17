import Loader from 'components/Loader';
import { useDashboardRoutes } from 'hooks/useDashboardRoutes';
import DashboardLayout from 'layout/dashboard/DashboardLayout';
import Page404 from 'pages/maintenance/Page404';
import { Suspense } from 'react';
import { useRoutes } from 'react-router';

export default function DashboardRoutes() {
  const dashboardRoutes = useDashboardRoutes();

  const element = useRoutes([...dashboardRoutes, { path: '*', element: <Page404 /> }]);
  return (
    <Suspense fallback={<Loader />}>
      <DashboardLayout>{element}</DashboardLayout>
    </Suspense>
  );
}
