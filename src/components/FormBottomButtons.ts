import { Grid, styled } from '@mui/material';

export const FormBottomButtons = styled(Grid)(({ theme }) => ({
  alignItems: 'flex-end',
  paddingTop: theme.spacing(2),
  display: 'flex',
  flex: 1,
  justifyContent: 'space-between'
}));
