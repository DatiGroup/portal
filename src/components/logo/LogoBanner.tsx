import { ButtonBase } from '@mui/material';
import { Box, BoxProps, styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { LogoProps } from './MainLogo';
import { APP_DEFAULT_PATH } from 'config';
import LogoLong from 'assets/logo/LongLogo';

const BannerWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: 170,
  height: 40,
  [theme.breakpoints.down('md')]: {
    width: 150,
    height: 20
  }
}));

const LogoBanner = ({ to = '/', ...rest }: LogoProps) => {
  return (
    <ButtonBase disableRipple component={Link} to={to || APP_DEFAULT_PATH} {...rest}>
      <BannerWrapper>
        <LogoLong width="100%" height="100%" />
      </BannerWrapper>
    </ButtonBase>
  );
};

export default LogoBanner;
