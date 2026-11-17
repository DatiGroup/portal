import { Box, BoxProps, styled } from '@mui/system';

const PageBox = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '1rem',
  minHeight: 'calc(100vh - 70px)',
  [theme.breakpoints.down('lg')]: {
    padding: '0.5rem'
  },
  [theme.breakpoints.down('md')]: {
    minHeight: 'calc(100vh - 60px)'
  },
  [theme.breakpoints.down('sm')]: {
    padding: '0.25rem'
  }
}));

export default PageBox;
