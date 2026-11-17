import { ReactElement } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// project imports
import AuthFooter from 'components/cards/AuthFooter';
import AuthCard from './AuthCard';

// assets
import AuthBackground from './AuthBackground';

interface Props {
  children: ReactElement;
}

export default function AuthWrapper({ children }: Props) {
  return (
    <Box sx={{ width: '100%' }}>
      <AuthBackground />
      <Grid container direction="column" justifyContent="flex-end">
        <Grid size={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 132px)' } }}
          >
            <Grid>
              <AuthCard>{children}</AuthCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{ pt: '1rem', zIndex: 1 }} size={12}>
          <AuthFooter />
        </Grid>
      </Grid>
    </Box>
  );
}
