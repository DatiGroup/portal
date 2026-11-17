import { Link, useSearchParams } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import useAuth from 'sections/auth/hooks/useAuth';
import AuthWrapper from 'sections/auth/components/AuthWrapper';
import AuthLogin from 'sections/auth/LoginForm';

// ================================|| JWT - LOGIN ||================================ //

export default function CheckMailView() {
  const { isLoggedIn } = useAuth();

  const [searchParams] = useSearchParams();
  const auth = searchParams.get('auth');

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Stack direction="row" sx={{ alignItems: 'baseline', justifyContent: 'space-between', mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Login</Typography>
            <Typography
              component={Link}
              to={isLoggedIn ? '/auth/register' : auth ? `/${auth}/auth/register?auth=jwt` : '/auth/register'}
              variant="body1"
              sx={{ textDecoration: 'none' }}
              color="primary"
            >
              Don&apos;t have an account?
            </Typography>
          </Stack>
        </Grid>
        <Grid size={12}>
          {/* <AuthLogin isDemo={isLoggedIn} /> */}
          <AuthLogin />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
