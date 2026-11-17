import { NavItemType } from 'types/menu';
import CodeOutlined from '@ant-design/icons/CodeOutlined';
import Loadable from 'components/Loadable';
import { lazy } from 'react';
import { routePaths } from 'routes/routePaths';

const IndexPage = Loadable(lazy(() => import('pages/dashboard/DashboardPage')));

const PortalGroup: NavItemType = {
  id: 'portal-group',
  type: 'group',
  dashboardRoute: [{ path: 'portal' }],
  children: [
    {
      id: 'portal-dashboard',
      title: 'Dashboard',
      type: 'item',
      url: routePaths.dashboard.portal.main,
      icon: CodeOutlined,
      dashboardRoute: [{ path: 'main', Component: IndexPage }]
    }
  ]
};

export default PortalGroup;
