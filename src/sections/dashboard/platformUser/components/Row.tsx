import { Stack, styled } from '@mui/material';

export const Row = styled(Stack)(({ theme }) => ({
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  columnGap: theme.spacing(1)
}));
