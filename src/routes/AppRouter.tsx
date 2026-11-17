import { ErrorBoundary } from 'components/ErrorBoundary';
import { useMemo } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import LegalRoutes from './LegalRoutes';
import DashboardRoutes from './DashboardRoutes';
import { routePaths } from './routePaths';

const AppRouter = () => {
  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: '/',
          errorElement: <ErrorBoundary />,
          children: [
            {
              index: true,
              element: <Navigate to={routePaths.dashboard.portal.main} replace />
            },
            AuthRoutes,
            LegalRoutes,
            {
              path: 'dashboard/*',
              element: <DashboardRoutes />
            }
          ]
        }
      ]),
    []
  );

  return <RouterProvider router={router} />;
};

export default AppRouter;
