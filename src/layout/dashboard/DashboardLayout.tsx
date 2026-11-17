import { useEffect } from 'react';
//import { useLocation } from 'react-router-dom';

// material-ui
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

// project imports
import Drawer from 'layout/dashboard/drawer/Drawer';
import Header from 'layout/dashboard/header/Header';
import Footer from 'layout/dashboard/footer/Footer';
import HorizontalBar from 'layout/dashboard/drawer/horizontalBar/HorizontalBar';
import AuthGuard from 'guards/AuthGuard';

import { MenuOrientation } from 'config';
import useConfig from 'hooks/useConfig';
import { useMenuMaster } from 'contexts/MenuMasterContext';
//import { routePaths } from 'routes/routePaths';
import { UserSocketProvider } from 'socket/context/UserSocketProvider';

// ==============================|| MAIN LAYOUT ||============================== //

/* const skipBreadcrumbs = [
  routePaths.dashboard.portal.main,
  routePaths.dashboard.tool.platformUsers.root,
  routePaths.dashboard.tool.lookups.root,
  routePaths.dashboard.tool.configurator.root,
  routePaths.dashboard.orders.products
  // routePaths.dashboard.tool.configurator.products
];
 */
interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  // const { pathname } = useLocation();
  const { handlerDrawerOpen } = useMenuMaster();
  const downXL = useMediaQuery((theme: Theme) => theme.breakpoints.down('xl'));
  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  const { container, miniDrawer, menuOrientation } = useConfig();

  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  // set media wise responsive drawer
  useEffect(() => {
    if (!miniDrawer) {
      handlerDrawerOpen(!downXL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downXL]);

  //  const skipB = skipBreadcrumbs.some((route) => route.startsWith(pathname));

  return (
    <AuthGuard>
      <UserSocketProvider>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Header />
          {!isHorizontal ? <Drawer /> : <HorizontalBar />}

          <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
            <Toolbar sx={{ mt: isHorizontal ? 8 : 'inherit' }} />
            <Container
              maxWidth={false}
              sx={{
                ...(container && { px: { xs: 0, sm: 2 } }),
                position: 'relative',
                minHeight: 'calc(100vh - 110px)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/*        {pathname !== '#!' && !skipB && <Breadcrumbs />} */}
              {children}
              <Footer />
            </Container>
          </Box>
        </Box>
      </UserSocketProvider>
    </AuthGuard>
  );
}
