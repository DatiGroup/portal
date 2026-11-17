import MenuOutlined from '@ant-design/icons/MenuOutlined';
import IconButton from 'components/@extended/IconButton';
import Localization from 'layout/dashboard/header/headerContent/components/Localization';
import { useState } from 'react';
import useAuth from 'sections/auth/hooks/useAuth';
import DrawerItem from './DrawerItem';
import { Box, Drawer, List, Stack } from '@mui/material';
import { routePaths } from 'routes/routePaths';

const MiniMenu = () => {
  const { isLoggedIn } = useAuth();
  const [drawerToggle, setDrawerToggle] = useState<boolean>(false);

  /** Method called on multiple components with different event types */
  const drawerToggler = (open: boolean) => (event: any) => {
    if (event.type! === 'keydown' && (event.key! === 'Tab' || event.key! === 'Shift')) {
      return;
    }
    setDrawerToggle(open);
  };

  return (
    <>
      <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
        <Localization />
        <IconButton
          color="secondary"
          onClick={drawerToggler(true)}
          variant="light"
          sx={(theme) => ({
            color: 'text.primary',
            bgcolor: 'transparent'
          })}
        >
          <MenuOutlined />
        </IconButton>
      </Stack>
      <Drawer anchor="top" open={drawerToggle} onClose={drawerToggler(false)}>
        <Box
          sx={{ width: 'auto', '& .MuiListItemIcon-root': { fontSize: '1rem', minWidth: 28 } }}
          role="presentation"
          onClick={drawerToggler(false)}
          onKeyDown={drawerToggler(false)}
        >
          <List>
            {isLoggedIn && <DrawerItem to={routePaths.dashboard.portal.main} text="Dashboard" />}
            {!isLoggedIn && <DrawerItem to={routePaths.auth.login} text="Login" />}
            {!isLoggedIn && <DrawerItem to={routePaths.auth.register} text="Register" />}
            <DrawerItem to="/" text="Home" />
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default MiniMenu;
