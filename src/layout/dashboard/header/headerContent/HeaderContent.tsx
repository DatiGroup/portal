import { useMemo } from 'react';

// material-ui
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

// project imports
import Search from 'layout/dashboard/header/headerContent/components/Search';
import Profile from 'layout/dashboard/header/headerContent/profile/Profile';
import Localization from 'layout/dashboard/header/headerContent/components/Localization';
import Notification from 'layout/dashboard/header/headerContent/components/Notification';
import FullScreen from 'layout/dashboard/header/headerContent/components/FullScreen';
import MobileSection from 'layout/dashboard/header/headerContent/components/MobileSection';
import MegaMenuSection from 'layout/dashboard/header/headerContent/components/MegaMenuSection';

import useConfig from 'hooks/useConfig';
import { MenuOrientation } from 'config';
import DrawerHeader from 'layout/dashboard/drawer/drawerHeader/DrawerHeader';
import OrgSwitch from './OrgSwitch';
import ModeSwitch from './components/ModeSwitch';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const { menuOrientation } = useConfig();

  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  const localization = useMemo(() => <Localization />, []);
  // const modeSwitch = useMemo(() => <ModeSwitch />, []);
  const megaMenu = useMemo(() => <MegaMenuSection />, []);

  return (
    <>
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />}
      {!downLG && <Search />}
      {!downLG && megaMenu}
      {localization}
      {/* {modeSwitch} */}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

      <Notification />
      {/*       <Message /> */}

      <OrgSwitch />
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
      {!downLG && <FullScreen />}
    </>
  );
}
