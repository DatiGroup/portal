import { Box, Button, Link, Stack, useTheme } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import useAuth from 'sections/auth/hooks/useAuth';
import { Link as RouterLink } from 'react-router-dom';
import Localization from 'layout/dashboard/header/headerContent/components/Localization';
import { routePaths } from 'routes/routePaths';

const FullMenu = () => {
  const { isLoggedIn } = useAuth();

  const theme = useTheme();

  return (
    <>
      <Stack direction="row" sx={{ gap: 3, alignItems: 'center' }}>
        <Link className="header-link" color={theme.palette.secondary.main} component={RouterLink} to="/" underline="none">
          Home
        </Link>
        <Localization />
        <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
          {isLoggedIn && (
            <Box sx={{ display: 'inline-block', ml: 1 }}>
              <AnimateButton>
                <Button component={RouterLink} to={routePaths.dashboard.portal.main} disableElevation color="primary" variant="contained">
                  Dashboard
                </Button>
              </AnimateButton>
            </Box>
          )}
          {!isLoggedIn && (
            <Box sx={{ display: 'inline-block', ml: 1 }}>
              <AnimateButton>
                <Button component={RouterLink} to={routePaths.auth.login} disableElevation color="primary" variant="contained">
                  Log In
                </Button>
              </AnimateButton>
            </Box>
          )}
          {!isLoggedIn && (
            <Box sx={{ display: 'inline-block', ml: 1 }}>
              <AnimateButton>
                <Button component={RouterLink} to={routePaths.auth.register} disableElevation color="secondary" variant="contained">
                  Register
                </Button>
              </AnimateButton>
            </Box>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default FullMenu;
