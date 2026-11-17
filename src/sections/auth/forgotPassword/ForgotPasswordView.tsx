import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AuthWrapper from 'sections/auth/components/AuthWrapper';
import ForgotForm from 'sections/auth/forgotPassword/ForgotForm';
import { useTranslation } from 'react-i18next';
import { routePaths } from 'routes/routePaths';

export default function ForgotPasswordView() {
  const { t } = useTranslation();

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Stack direction="row" sx={{ alignItems: 'baseline', justifyContent: 'space-between', mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">{t('forgotPassword')}</Typography>
            <Typography component={Link} to={routePaths.auth.login} variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              {t('backToLogin')}
            </Typography>
          </Stack>
        </Grid>
        <Grid size={12}>
          <ForgotForm />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
