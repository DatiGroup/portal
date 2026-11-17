import { useLocation, Link, Outlet } from 'react-router-dom';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';

import MainCard from 'components/MainCard';
import Breadcrumbs from 'components/@extended/Breadcrumbs';

import UserOutlined from '@ant-design/icons/UserOutlined';
import MailOutlined from '@ant-design/icons/MailOutlined';
import { useTranslation } from 'react-i18next';
import { routePaths } from 'routes/routePaths';
import { removeLastSlash } from 'utils/formatString';

export default function OrgUserLayout() {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const showList = pathname.includes('list');

  const breadcrumbLinks = [
    { title: t('home'), to: routePaths.dashboard.portal.main },
    { title: t('drawer.item.org-members'), to: routePaths.dashboard.tool.orgMembers.list },
    { title: showList ? t('invitation.userList') : t('invitation.inviteList') }
  ];

  const TAB_ITEMS = [
    {
      value: 'list',
      label: t('invitation.userList'),
      icon: <UserOutlined />,
      href: `${routePaths.dashboard.tool.orgMembers.list}`
    },

    {
      value: 'invite',
      label: t('invitation.inviteList'),
      icon: <MailOutlined />,
      href: `${routePaths.dashboard.tool.orgMembers.invite}`
    }
  ];

  return (
    <>
      <Breadcrumbs custom links={breadcrumbLinks} />
      <MainCard border={false} boxShadow>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
          <Tabs value={removeLastSlash(pathname)} variant="fullWidth">
            {TAB_ITEMS.map((tab) => (
              <Tab component={Link} key={tab.value} label={tab.label} icon={tab.icon} value={tab.href} to={tab.href} />
            ))}
          </Tabs>
        </Box>
        <Box sx={{ mt: 2.5 }}>
          <Outlet />
        </Box>
      </MainCard>
    </>
  );
}
