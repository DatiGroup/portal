import { NavItemType } from 'types/menu';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { RoleEnum } from 'store/type/RoleEnum';
import Loadable from 'components/Loadable';
import { lazy } from 'react';
import { PlatformUserBreadcrumbLayout } from 'layout/dashboard/breadcrumbs/PlatformUserBreadcrumbLayout';
import { routePaths } from 'routes/routePaths';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import OrgUserLayout from 'sections/dashboard/orgMembers/OrgUserLayout';
import { Navigate } from 'react-router-dom';

const LookupsPage = Loadable(lazy(() => import('pages/dashboard/LookupsPage')));
const LookupAddPage = Loadable(lazy(() => import('pages/dashboard/LookupAddPage')));
const LookupValuesPage = Loadable(lazy(() => import('pages/dashboard/LookupValuesPage')));
const LookupValueAddPage = Loadable(lazy(() => import('pages/dashboard/LookupValueAddPage')));

const PlatformUserPage = Loadable(lazy(() => import('pages/dashboard/PlatformUserPage')));
const PlatformUserDetailPage = Loadable(lazy(() => import('pages/dashboard/PlatformUserDetailPage')));
const OrgUserPage = Loadable(lazy(() => import('pages/dashboard/OrgUserPage')));
const OrgUserInvitePage = Loadable(lazy(() => import('pages/dashboard/OrgUserInvitePage')));

// const BlankPage = Loadable(lazy(() => import('pages/dashboard/BlankPage')));

const ToolGroup: NavItemType = {
  id: 'tool-group',
  title: 'Tools',
  type: 'group',
  allowedRoles: [RoleEnum.portalAdminLookupEdit, RoleEnum.portalAdminLookupView, RoleEnum.portalClientView],
  dashboardRoute: [{ path: 'tool' }],
  children: [
    // {
    //   id: 'lookups',
    //   title: 'Lookups',
    //   type: 'item',
    //   icon: AppstoreOutlined,
    //   url: routePaths.dashboard.tool.lookups.root,
    //   allowedRoles: [RoleEnum.portalAdminLookupEdit, RoleEnum.portalAdminLookupView],
    //   dashboardRoute: [
    //     {
    //       path: 'lookups',
    //       Component: LookupValuesBreadcrumbLayout,
    //       children: [
    //         { index: true, Component: LookupsPage },
    //         { path: 'lookup-add', Component: LookupAddPage },
    //         { path: ':type/values', Component: LookupValuesPage },
    //         { path: ':type/values/lookup-value-add', Component: LookupValueAddPage }
    //       ]
    //     }
    //   ]
    // },
    {
      id: 'platform-users',
      title: 'Platform Users',
      type: 'item',
      icon: UserOutlined,
      url: routePaths.dashboard.tool.platformUsers.root,
      allowedRoles: [RoleEnum.portalAdminUserView, RoleEnum.portalAdminUserEdit],
      dashboardRoute: [
        {
          path: 'platform-users',
          Component: PlatformUserBreadcrumbLayout,
          children: [
            { index: true, Component: PlatformUserPage },
            { path: ':id/details', Component: PlatformUserDetailPage }
          ]
        }
      ]
    },
    {
      id: 'org-members',
      title: 'Org Members',
      type: 'item',
      icon: TeamOutlined,
      url: routePaths.dashboard.tool.orgMembers.root,
      allowedRoles: [RoleEnum.portalClientEdit],
      dashboardRoute: [
        {
          path: 'org-members',
          Component: OrgUserLayout,
          // Component: OrgUserPage
          children: [
            { index: true, Component: () => <Navigate to={'list'} replace /> },
            { path: 'list', Component: OrgUserPage },
            { path: 'invite', Component: OrgUserInvitePage }
          ]
        }
      ]
    }
  ]
};

export default ToolGroup;
