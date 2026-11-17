import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
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
import { routePaths } from 'routes/routePaths';
import { useAcceptInviteMutation, useSentInviteOtpMutation } from 'store/slices/invitation/invitationSlice';

const schema = (t: TFunction) =>
  zod.object({
    invitationCode: zod.string().min(1, { message: t('validator.required') }),
    otpCode: zod
      .string()
      .min(1, { message: t('validator.otpCodeRequired') })
      .min(6, { message: t('validator.otpCodeLength') })
  });
export type FromType = zod.infer<ReturnType<typeof schema>>;

export default function AcceptForm() {
  const captchaRef = useRef<HCaptcha>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { code } = useParams<{ code: string }>();
  const [isLoading, setIsLoading] = useState(false);

  const [acceptInvite] = useAcceptInviteMutation();
  const [sentOtp] = useSentInviteOtpMutation();

  const methods = useForm<FromType>({
    resolver: zodResolver(schema(t)),
    defaultValues: { invitationCode: code || '', otpCode: '' }
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch
  } = methods;

  const onGetOtpCode = async () => {
    try {
      setIsLoading(true);
      await captchaRef.current?.execute();
    } catch (error) {
      setIsLoading(false);
      console.error('Invitation accept error:', error);
      showErrorMessage();
    }
  };

  const data = watch();

  const onCaptchaConfirm = async (token: string) => {
    try {
      await sentOtp({ invitationCode: data.invitationCode, recaptchaToken: token }).unwrap();
      await showSuccessMessage(t('invitation.otpCodeSent'));
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const onClose = () => {
    setIsLoading(false);
  };

  const onAccept = handleSubmit(async (data) => {
    try {
      await acceptInvite({ invitationCode: data.invitationCode, otpCode: data.otpCode }).unwrap();
      navigate(routePaths.auth.login);
      await showSuccessMessage();
    } catch (error) {
      showError(error);
    }
  });

  return (
    <Form aria-label="acceptInitationFrom" methods={methods} aria-multiline>
      <CustomCaptcha ref={captchaRef} onSubmit={onCaptchaConfirm} onClose={onClose} />
      <Grid container spacing={3}>
        <Grid size={12}>
          <Typography>{t('invitation.acceptTopTitle')}</Typography>
        </Grid>
        <Grid size={12}>
          <Field.Code name="otpCode" />
        </Grid>
        <Grid size={12} container justifyContent="space-between">
          <Button
            disableElevation
            disabled={isLoading}
            loading={isLoading}
            size="large"
            variant="outlined"
            color="primary"
            onClick={onGetOtpCode}
          >
            {t('invitation.getOtpCode')}
          </Button>
          <Button
            disableElevation
            disabled={isSubmitting}
            loading={isSubmitting}
            size="large"
            variant="contained"
            color="primary"
            onClick={onAccept}
          >
            {t('invitation.acceptInvitation')}
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
}
