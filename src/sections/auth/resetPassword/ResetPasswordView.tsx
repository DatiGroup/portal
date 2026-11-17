import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AuthWrapper from 'sections/auth/components/AuthWrapper';
import ResetPasswordForm from './ResetPasswordForm';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import CodeVerificationForm from './CodeVerificationForm';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { routePaths } from 'routes/routePaths';
enum Steps {
  PASSWORD = 'PASSWORD',
  OTP = 'OTP'
}

export default function ResetPasswordView() {
  const [activeStep, setActiveStep] = useState<Steps>(Steps.PASSWORD);
  const { t } = useTranslation();
  const [newPassword, setNewPassword] = useState<string>('');
  const title = activeStep === Steps.PASSWORD ? t('resetPassword.changePasword') : t('resetPassword.otpTitle');
  const subTitle = activeStep === Steps.PASSWORD ? t('resetPassword.changePaswordSubtitle') : t('resetPassword.otpSubtitleTitle');

  const handlePasswordSuccess = (password: string) => {
    setNewPassword(password);
    setActiveStep(Steps.OTP);
  };

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Stack direction="row" sx={{ alignItems: 'baseline', justifyContent: 'space-between', mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">{title}</Typography>
            <Typography component={Link} to={routePaths.auth.login} variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              {t('backToLogin')}
            </Typography>
          </Stack>
          <Typography mt={2} variant="subtitle1" color="textSecondary">
            {subTitle}
          </Typography>
        </Grid>
        <Grid size={12}>
          {activeStep === Steps.PASSWORD ? <ResetPasswordForm onSuccess={handlePasswordSuccess} /> : null}
          {activeStep === Steps.OTP ? <CodeVerificationForm newPassword={newPassword} /> : null}
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
