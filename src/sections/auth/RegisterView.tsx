import { Link, useSearchParams } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import useAuth from 'sections/auth/hooks/useAuth';
import AuthWrapper from 'sections/auth/components/AuthWrapper';
import RegisterForm from 'sections/auth/RegisterForm';
import { useTranslation } from 'react-i18next';

// ================================|| JWT - REGISTER ||================================ //

export default function RegisterView() {
  const { isLoggedIn } = useAuth();

  const [searchParams] = useSearchParams();
  const auth = searchParams.get('auth'); // get auth and set route based on that
  const { t } = useTranslation();

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Stack direction="row" sx={{ alignItems: 'baseline', justifyContent: 'space-between', mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Sign up</Typography>
            <Typography
              component={Link}
              to={isLoggedIn ? '/auth/login' : auth ? `/${auth}/auth/login?auth=jwt` : '/auth/login'}
              variant="body1"
              sx={{ textDecoration: 'none' }}
              color="primary"
            >
              {t('register.haveAccount')}
            </Typography>
          </Stack>
        </Grid>
        <Grid size={12}>
          <RegisterForm />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
