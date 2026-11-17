import { useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/passwordStrength';
import { StringColorProps } from 'types/password';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import zod from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Form } from 'components/hook-form';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { showError, showErrorMessage } from 'utils/alerts';
import CustomCaptcha from 'components/CustomCaptcha';
import { defaultLevelProps } from '../hooks/useRegister';
import { sendOtp } from 'store/slices/auth/authSlice';
import { routePaths } from 'routes/routePaths';

const schema = (t: TFunction) =>
  zod
    .object({
      password: zod
        .string()
        .min(8, t('validator.min', { min: 8 }))
        .max(64, t('validator.max', { max: 64 }))
        .regex(/^(?=.*[a-z])/, t('validator.password.lowerCaseCheck'))
        .regex(/^(?=.*[A-Z])/, t('validator.password.upperCaseCheck'))
        .regex(/^(?=.*\d)/, t('validator.password.digitCheck'))
        .regex(/^(?=.*[!@#$%^&()_+\-=\[\]{}|\\:";'<>,.?/~])/, t('validator.password.specialCharCheck')),
      repeatPassword: zod.string()
    })
    .superRefine(({ password, repeatPassword }, ctx) => {
      if (password !== repeatPassword)
        ctx.addIssue({
          code: 'custom',
          message: t('validator.notMatch'),
          path: ['repeatPassword']
        });
    });

type FormType = zod.infer<ReturnType<typeof schema>>;

interface Props {
  onSuccess: (newPassword: string) => void;
}

export default function ResetPasswordForm({ onSuccess }: Props) {
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get('token') || '';
  const captchaRef = useRef<HCaptcha>(null);
  const [level, setLevel] = useState<StringColorProps>(defaultLevelProps);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<FormType>({
    resolver: zodResolver(schema(t)),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      repeatPassword: ''
    }
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting }
  } = methods;

  const newPassword = watch('password');

  const onSubmit = handleSubmit(async () => {
    try {
      setIsLoading(true);
      await captchaRef.current?.execute();
    } catch (error) {
      console.error('ResetPasswordForm onSubmit error:', error);
      showErrorMessage();
      setIsLoading(false);
    }
  });
  const onCaptchaConfirm = async (recaptchaToken: string) => {
    try {
      await sendOtp({ recaptchaToken: recaptchaToken, token: resetToken });
      await onSuccess(newPassword);
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onClose = () => {
    setIsLoading(false);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue('password', newValue);
    setLevel(strengthColor(strengthIndicator(newValue)) ?? { color: '', label: '' });
  };
  // Add early validation
  if (!resetToken) {
    return (
      <Stack spacing={3} alignItems="center" sx={{ py: 5 }}>
        <Typography variant="h6" gutterBottom>
          {t('resetPassword.invalidResetLink')}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate(routePaths.auth.login)}>
          {t('backToLogin')}
        </Button>
      </Stack>
    );
  }

  return (
    <Form aria-label="changePasswordForm" methods={methods} onSubmit={onSubmit} autoSubmit>
      <CustomCaptcha ref={captchaRef} onSubmit={onCaptchaConfirm} onClose={onClose} />
      <Grid container rowGap={3}>
        <Grid size={12}>
          <Field.Password name="password" label={t('password')} placeholder={t('xcharacters', { x: 6 })} onChange={onPasswordChange} />
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
            <Box aria-label="strengthIndicator" sx={{ bgcolor: level.color, width: 85, height: 8, borderRadius: '7px' }} />
            <Typography aria-label="strengthText" variant="subtitle1" fontSize="0.75rem">
              {level.label}
            </Typography>
          </Stack>
        </Grid>
        <Grid size={12}>
          <Field.Password name="repeatPassword" label={t('repeatPassword')} placeholder={t('xcharacters', { x: 6 })} />
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
              {t('submit')}
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </Form>
  );
}
