import { useMemo } from 'react';

// material-ui
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';

// project imports
import DrawerHeader from 'layout/dashboard/drawer/drawerHeader/DrawerHeader';
import DrawerContent from 'layout/dashboard/drawer/drawerContent/DrawerContent';
import MiniDrawerStyled from 'layout/dashboard/drawer/styles/MiniDrawerStyled';

import { DRAWER_WIDTH } from 'config';
import { useMenuMaster } from 'contexts/MenuMasterContext';

interface Props {
  window?: () => Window;
}

// ==============================|| MAIN LAYOUT - DRAWER ||============================== //

export default function MainDrawer({ window }: Props) {
  const { menuMaster, handlerDrawerOpen } = useMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  // responsive drawer container
  const container = window !== undefined ? () => window().document.body : undefined;

  // header content
  const drawerContent = useMemo(() => <DrawerContent />, []);
  const drawerHeader = useMemo(() => <DrawerHeader open={drawerOpen} />, [drawerOpen]);

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1200 }} aria-label="mailbox folders">
      {!downLG ? (
        <MiniDrawerStyled variant="permanent" open={drawerOpen}>
          {drawerHeader}
          {drawerContent}
        </MiniDrawerStyled>
      ) : (
        <Drawer
          container={container}
          variant="temporary"
          open={drawerOpen}
          onClose={() => handlerDrawerOpen(!drawerOpen)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: drawerOpen ? 'block' : 'none', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              borderRight: '1px solid',
              borderRightColor: 'divider',
              boxShadow: 'inherit'
            }
          }}
        >
          {drawerHeader}
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
}
