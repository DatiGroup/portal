import { Stack, styled } from '@mui/material';

export const MobileCard = styled(Stack)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius
}));
