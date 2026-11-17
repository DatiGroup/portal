import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';

import { Field, Form } from 'components/hook-form';
import { TFunction } from 'i18next/typescript/t';
import { emailSchema } from 'formValidation/emailSchema';
import { useInviteUserMutation } from 'store/slices/invitation/invitationSlice';
import { showError, showSuccessMessage } from 'utils/alerts';

const schema = (t: TFunction) =>
  zod.object({
    userName: zod
      .string()
      .min(1, { message: t('validator.required') })
      .max(30, t('validator.max', { max: 30 })),
    email: emailSchema(t),
    firstName: zod
      .string()
      .max(50, t('validator.max', { max: 50 }))
      .nonempty(t('validator.required')),
    lastName: zod
      .string()
      .max(50, t('validator.max', { max: 50 }))
      .nonempty(t('validator.required'))
  });

type SchemaType = zod.infer<ReturnType<typeof schema>>;

interface Props {
  onClose: () => void;
}

const InvitationForm = ({ onClose }: Props) => {
  const { t } = useTranslation();
  const [createInvite] = useInviteUserMutation();

  const defaultValues: SchemaType = {
    userName: '',
    email: '',
    firstName: '',
    lastName: ''
  };

  const methods = useForm<SchemaType>({
    resolver: zodResolver(schema(t)),
    defaultValues
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const onSubmit = handleSubmit(async (data: SchemaType) => {
    try {
      await createInvite({
        email: data.email,
        userName: data.userName,
        firstName: data.firstName,
        lastName: data.lastName
      }).unwrap();
      showSuccessMessage(t('invitation.inviteCreated'));
    } catch (error: any) {
      showError(error);
    } finally {
      onClose();
    }
  });

  return (
    <Dialog open={true} maxWidth="xs" fullWidth>
      <DialogTitle> {t('invitation.createInvitation')}</DialogTitle>
      <DialogContent>
        <Form methods={methods} onSubmit={onSubmit}>
          <Grid container rowGap={2} columnSpacing={1} mt={1}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Field.Text name="email" label={t('email')} slotProps={{ htmlInput: { maxLength: 100 } }} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Field.Text name="userName" label={t('userName')} slotProps={{ htmlInput: { maxLength: 30 } }} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Field.Text name="firstName" label={t('firstName')} slotProps={{ htmlInput: { maxLength: 30 } }} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Field.Text name="lastName" label={t('lastName')} slotProps={{ htmlInput: { maxLength: 30 } }} />
            </Grid>
          </Grid>
        </Form>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" disabled={isSubmitting} loading={isSubmitting} onClick={onSubmit}>
          {t('invitation.sendInvitation')}
        </Button>
        <Button onClick={onClose}>{t('close')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InvitationForm;
