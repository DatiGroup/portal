import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import zod from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Field, Form } from 'components/hook-form';

interface Props {
  onReject: (comment?: string) => Promise<void>;
  onClose: () => void;
}

const schema = zod.object({
  comment: zod.string().optional()
});

type FormType = zod.infer<typeof schema>;

export default function RejectDialog({ onReject, onClose }: Props) {
  const { t } = useTranslation();
  const defaultValues: FormType = {
    comment: ''
  };

  const methods = useForm<FormType>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues,
    values: defaultValues
  });

  const {
    handleSubmit,
    formState: { isSubmitting, dirtyFields }
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    await onReject(dirtyFields?.comment ? data.comment : undefined);
  });

  return (
    <Dialog open={true} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{t('rejectRegistration')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('rejectReasonOptional')}</DialogContentText>
        <Form methods={methods}>
          <Field.Text name="comment" multiline rows={3} label={t('comments')} slotProps={{ htmlInput: { maxLength: 200 } }} />
        </Form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('cancel')}</Button>
        <Button onClick={onSubmit} variant="contained" loading={isSubmitting}>
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
