import { Box, Container, AppBar as MuiAppBar, Theme, Toolbar, useMediaQuery } from '@mui/material';
import MainLogo from 'components/logo/MainLogo';
import MiniMenu from 'layout/landing/header/components/appBar/MiniMenu';
import FullMenu from 'layout/landing/header/components/appBar/FullMenu';
import LogoBanner from 'components/logo/LogoBanner';

const AppBar = ({ ...rest }) => {
  const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <MuiAppBar {...rest}>
      <Container maxWidth={false} disableGutters={downMD}>
        <Toolbar sx={{ px: { xs: 1.5, md: 0, lg: 0 }, py: { xs: 1, md: 2 } }}>
          <Box sx={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', display: 'flex' }}>
            {downMD ? <MainLogo /> : <LogoBanner />}
            {downMD ? <MiniMenu /> : <FullMenu />}
          </Box>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};

export default AppBar;
