import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AnimateButton from 'components/@extended/AnimateButton';
import zod from 'zod';
import { showError, showErrorMessage, showSuccessMessage } from 'utils/alerts';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Form } from 'components/hook-form';
import { Typography } from '@mui/material';
import { useRef, useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import CustomCaptcha from 'components/CustomCaptcha';
import { sendResetLink } from 'store/slices/auth/authSlice';
import { routePaths } from 'routes/routePaths';
import { emailSchema } from 'formValidation/emailSchema';

const schema = (t: TFunction) =>
  zod.object({
    email: emailSchema(t)
  });

export type FromType = zod.infer<ReturnType<typeof schema>>;
export default function ForgotForm() {
  const captchaRef = useRef<HCaptcha>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<FromType>({
    resolver: zodResolver(schema(t)),
    defaultValues: { email: '' }
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch
  } = methods;

  const onSubmit = handleSubmit(async () => {
    try {
      setIsLoading(true);
      await captchaRef.current?.execute();
    } catch (error) {
      console.error('ForgotForm onSubmit error:', error);
      setIsLoading(false);
      showErrorMessage();
    }
  });

  const data = watch();

  const onCaptchaConfirm = async (token: string) => {
    try {
      await sendResetLink(data.email, token);
      await showSuccessMessage(t('resetPassword.emailSent'));
      navigate(routePaths.auth.login);
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const onClose = () => {
    setIsLoading(false);
  };

  return (
    <Form aria-label="admiEmailChange" methods={methods} autoSubmit aria-multiline onSubmit={onSubmit}>
      <CustomCaptcha ref={captchaRef} onSubmit={onCaptchaConfirm} onClose={onClose} />
      <Grid container spacing={3}>
        <Grid size={12}>
          <Typography>{t('resetPassword.resetEmail')}</Typography>
        </Grid>
        <Grid size={12}>
          <Field.Email name="email" label={''} />
        </Grid>
        <Grid size={12}>
          <AnimateButton>
            <Button
              type="submit"
              disableElevation
              disabled={isLoading || isSubmitting}
              loading={isLoading || isSubmitting}
              fullWidth
              size="large"
              variant="contained"
              color="primary"
            >
              {t('send')}
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </Form>
  );
}
