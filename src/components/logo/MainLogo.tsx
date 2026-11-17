import { Link } from 'react-router-dom';
import { To } from 'history';

// material-ui
import ButtonBase from '@mui/material/ButtonBase';
import { APP_DEFAULT_PATH } from 'config';

// project imports
import { Box, BoxProps, styled } from '@mui/system';
import { LinkProps } from '@mui/material';
import Logo from 'assets/logo/Logo';

// ==============================|| MAIN LOGO ||============================== //

export interface LogoProps extends LinkProps {
  to?: To;
}

const LogoWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: 32,
  height: 32,
  [theme.breakpoints.down('md')]: {
    width: 28,
    height: 28
  }
}));

export default function MainLogo({ to = '/', ...rest }: LogoProps) {
  return (
    <ButtonBase disableRipple component={Link} to={to || APP_DEFAULT_PATH} {...rest}>
      <LogoWrapper>
        <Logo width="100%" height="100%" />
      </LogoWrapper>
    </ButtonBase>
  );
}
