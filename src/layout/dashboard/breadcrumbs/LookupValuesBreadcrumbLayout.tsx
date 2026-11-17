import { useTranslation } from 'react-i18next';

import Breadcrumbs from 'components/@extended/Breadcrumbs';
import { Outlet, useLocation, useParams } from 'react-router';
import { routePaths } from 'routes/routePaths';
import { useGetLookupValuesQuery } from 'store/slices/lookup/lookupSlice';

export function LookupValuesBreadcrumbLayout() {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const { type } = useParams();
  const { data: apiData } = useGetLookupValuesQuery(type!, { skip: !type });

  const currentLang = i18n.language;
  const typeTranslation = apiData?.tl?.find((tl) => tl.languageCode === currentLang)?.translation?.meaning ?? '';

  const showLookupAdd = pathname.includes('lookup-add');
  const showValues = pathname.includes('values');
  const showValueAdd = pathname.includes('lookup-value-add');

  let breadcrumbLinks = [
    { title: t('home'), to: routePaths.dashboard.portal.main },
    { title: t('lookups.index'), to: routePaths.dashboard.tool.lookups.root },
    ...(showLookupAdd ? [{ title: t('lookups.addLookup') }] : []),
    ...(showValues ? [{ title: typeTranslation, to: routePaths.dashboard.tool.lookups.values(type || '') }] : []),
    ...(showValueAdd ? [{ title: t('lookups.addValue') }] : [])
  ];

  return (
    <>
      <Breadcrumbs custom heading={t('lookups.index')} links={breadcrumbLinks} />
      <Outlet />
    </>
  );
}
