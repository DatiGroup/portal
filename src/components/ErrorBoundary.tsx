import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import Loadable from 'components/Loadable';
import { lazy } from 'react';
import Page404 from 'pages/maintenance/Page404';
// imported eagerly so the error page still renders when lazy chunk loading is what failed
import View500 from 'sections/maintenance/View500';
import { isNonProd } from 'utils/envUtils';

// error pages
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/ComingSoonPage')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/UnderConstructionPage')));

const isDev = isNonProd();

// ==============================|| ERROR BOUNDARY ||============================== //
export function ErrorBoundary() {
  // different kinds of errors
  let error: any = useRouteError();

  // manual errors don't pass check after react-router v6.30.1
  if (isRouteErrorResponse(error)) {
    const { status } = error;

    switch (status) {
      case 404:
        return <Page404 />;
      case 500:
        return <View500 />;
      default:
        if (!isDev) return <View500 />;

        return (
          <div>
            <h1>{error.status || 'Unknown error'}</h1>
            <h2>{error.statusText || 'An error occurred'}</h2>
            <p>{error.data?.message || 'An unexpected error occurred'}</p>
          </div>
        );
    }
  }

  // manual errors without stack trace (i.e. "throw data('Custom error', {status: 701})")
  else if (error?.type === 'DataWithResponseInit') {
    const { data, init } = error;

    switch (init?.status) {
      case 701:
        return <MaintenanceComingSoon />;
      case 702:
        return <MaintenanceUnderConstruction />;
      default:
        if (!isDev) return <View500 />;

        return (
          <div>
            <h1>{init?.status || 'Unknown error'}</h1>
            <h2>{data?.title || 'An error occurred'}</h2>
            <p>{data?.message || 'An unexpected error occurred'}</p>
          </div>
        );
    }
  }

  // unhandled errors: never expose details or stack traces outside of development
  if (!isDev) return <View500 />;

  // application errors (i.e. internal application errors or custom application errors by throwing "throw new Error('Custom error')")
  if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  }

  return <h1>Unknown Error</h1>;
}
