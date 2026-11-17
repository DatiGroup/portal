import { Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { useUpdateAdminEmailMutation } from 'store/slices/platformUsers/platformUserSlice';
import { showErrorMessage } from 'utils/alerts';
import { useTranslation } from 'react-i18next';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import useCanEditUser from './hooks/useCanEditUser';
import { TFunction } from 'i18next';
import zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Form } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import { Iconify } from 'components/Iconify';
import { emailSchema } from 'formValidation/emailSchema';

const schema = (t: TFunction) =>
  zod.object({
    email: emailSchema(t)
  });

export type FromType = zod.infer<ReturnType<typeof schema>>;

interface Props {
  email: string;
}
const AdminEmail = ({ email }: Props) => {
  const { t } = useTranslation();
  const [updateAdminEmail, { isLoading: isUpdating }] = useUpdateAdminEmailMutation();
  const { canEdit } = useCanEditUser();
  const [edit, setEdit] = useState(false);

  const methods = useForm<FromType>({
    resolver: zodResolver(schema(t)),
    defaultValues: { email: email || '' }
  });

  const onEdit = () => setEdit(true);
  const onCancel = () => setEdit(false);

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const onSubmit = handleSubmit(async (data: FromType) => {
    try {
      await updateAdminEmail({ email: data.email }).unwrap();
    } catch {
      showErrorMessage();
    } finally {
      setEdit(false);
    }
  });

  return (
    <Form aria-label="admiEmailChange" methods={methods} autoSubmit aria-multiline>
      <Grid container gap={2} alignItems="center" minHeight={45}>
        <Tooltip title={t('adminEmail.info')}>
          <Iconify icon="mdi:information-outline" width={20} sx={{ cursor: 'pointer' }} />
        </Tooltip>
        <Typography color="text.secondary">{t('adminEmail.email')}</Typography>
        <Grid size={{ xs: 12, sm: 'auto' }}>
          {edit ? (
            <Field.Email name="email" label={''} sx={{ minWidth: 300 }} disabled={!canEdit || !edit} />
          ) : (
            <Typography>{email}</Typography>
          )}
        </Grid>
        {edit ? (
          <>
            <IconButton onClick={onSubmit} disabled={!canEdit} loading={isSubmitting || isUpdating}>
              <CheckOutlined />
            </IconButton>
            <IconButton onClick={onCancel} disabled={!canEdit}>
              <CloseOutlined />
            </IconButton>
          </>
        ) : (
          <IconButton onClick={onEdit} disabled={!canEdit}>
            <EditOutlined />
          </IconButton>
        )}
      </Grid>
    </Form>
  );
};

export default AdminEmail;
