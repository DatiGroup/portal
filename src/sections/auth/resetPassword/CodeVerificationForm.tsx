import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { z as zod } from 'zod';

import AnimateButton from 'components/@extended/AnimateButton';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPassword } from 'store/slices/auth/authSlice';
import { useNavigate, useSearchParams } from 'react-router';
import { routePaths } from 'routes/routePaths';
import { showError, showSuccessMessage } from 'utils/alerts';
import { useTranslation } from 'react-i18next';
import { Field, Form } from 'components/hook-form';
import { TFunction } from 'i18next';

export const schema = (t: TFunction) =>
  zod.object({
    code: zod
      .string()
      .min(1, { message: t('validator.otpCodeRequired') })
      .min(6, { message: t('validator.otpCodeLength') })
  });

export type FromType = zod.infer<ReturnType<typeof schema>>;

interface Props {
  newPassword: string;
}
export default function CodeVerificationForm({ newPassword }: Props) {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get('token') || '';
  const navigate = useNavigate();

  const methods = useForm<FromType>({
    resolver: zodResolver(schema(t)),
    defaultValues: { code: '' }
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { code } = data;
      await resetPassword({ otpCode: code, token: resetToken, newPassword: newPassword });
      await showSuccessMessage(t('resetPassword.passwordResetSuccess'));
      navigate(routePaths.auth.login);
    } catch (error) {
      showError(error);
    }
  });

  return (
    <Form aria-label="changePasswordForm" methods={methods} onSubmit={onSubmit} autoSubmit>
      <Grid container rowGap={3}>
        <Grid size={12}>
          <Field.Code name="code" />
        </Grid>
        <Grid size={12}>
          <AnimateButton>
            <Button
              type="submit"
              disableElevation
              disabled={isSubmitting}
              loading={isSubmitting}
              fullWidth
              size="large"
              variant="contained"
              color="primary"
            >
              {t('submit')}
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </Form>
  );
}
