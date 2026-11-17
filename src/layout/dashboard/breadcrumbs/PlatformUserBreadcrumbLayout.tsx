import { useTranslation } from 'react-i18next';

import Breadcrumbs from 'components/@extended/Breadcrumbs';
import { Outlet, useLocation, useParams } from 'react-router';
import { routePaths } from 'routes/routePaths';
import { usePlatformUserQuery } from 'store/slices/platformUsers/platformUserSlice';

export function PlatformUserBreadcrumbLayout() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { id = '' } = useParams();
  const { data } = usePlatformUserQuery(id, { skip: !id });
  const name = data ? `${data.user.profile.firstName ?? ''} ${data.user.profile.lastName ?? ''}` : '';

  const showDetails = pathname.includes('details');

  let breadcrumbLinks = [
    { title: t('home'), to: routePaths.dashboard.portal.main },
    { title: t('platformUsers'), to: showDetails ? routePaths.dashboard.tool.platformUsers.root : undefined },
    ...(showDetails ? [{ title: name }] : [])
  ];

  return (
    <>
      <Breadcrumbs custom heading={t('platformUsers')} links={breadcrumbLinks} />
      <Outlet />
    </>
  );
}
