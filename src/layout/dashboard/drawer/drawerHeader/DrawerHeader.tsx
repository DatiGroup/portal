// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import DrawerHeaderStyled from 'layout/dashboard/drawer/drawerHeader/styles/DrawerHeaderStyled';

import useConfig from 'hooks/useConfig';
import { MenuOrientation } from 'config';
import MainLogo from 'components/logo/MainLogo';
import ShortLogo from 'components/logo/LogoBanner';

interface Props {
  open: boolean;
}

// ==============================|| DRAWER HEADER ||============================== //

export default function DrawerHeader({ open }: Props) {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const { menuOrientation } = useConfig();
  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  return (
    <DrawerHeaderStyled
      open={open}
      sx={{
        minHeight: isHorizontal ? 'unset' : '60px',
        width: isHorizontal ? { xs: '100%', lg: '424px' } : 'initial',
        paddingTop: isHorizontal ? { xs: '10px', lg: '0' } : '8px',
        paddingBottom: isHorizontal ? { xs: '18px', lg: '0' } : '8px',
        paddingLeft: isHorizontal ? { xs: '24px', lg: '0' } : open ? '24px' : 0
      }}
    >
      {/* <Logo isIcon={!open} sx={{ width: open ? 'auto' : 35, height: 35 }} /> */}
      {open ? <ShortLogo /> : <MainLogo />}
    </DrawerHeaderStyled>
  );
}
