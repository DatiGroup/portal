import UserStatus from './UserStatus';
import { Button, IconButton, Stack, styled, Tooltip, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import EditOutlined from '@ant-design/icons/EditOutlined';
import { Row } from '../components/Row';
import { useStatusChangeMutation } from 'store/slices/platformUsers/platformUserSlice';
import { UserStatusChangePayloadType } from 'store/slices/platformUsers/platformUserTypes';
import { showErrorMessage } from 'utils/alerts';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';

interface Props {
  userId: number;
  enabled?: boolean;
  wasApproved?: boolean;
  canEdit?: boolean;
}

const UserStatusChange = ({ enabled, userId, wasApproved, canEdit }: Props) => {
  const { t } = useTranslation();

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [updateStatus] = useStatusChangeMutation();

  const onSave = async () => {
    try {
      setSaving(true);

      const payload: UserStatusChangePayloadType = {
        userId: userId,
        status: enabled ? 'disable' : 'enable'
      };

      await updateStatus(payload).unwrap();
      setEditing(false);
    } catch {
      showErrorMessage();
    } finally {
      setSaving(false);
    }
  };

  const onEdit = () => {
    setEditing(true);
  };
  const onCancel = () => {
    setEditing(false);
  };

  return (
    <Row>
      {editing ? (
        <Row>
          <Button variant="outlined" size="small" onClick={onCancel} disabled={saving}>
            {t('cancel')}
          </Button>
          <Button variant="contained" color="primary" size="small" disabled={saving} loading={saving} onClick={onSave}>
            {enabled ? t('iam.disableUser') : t('iam.enableUser')}
          </Button>
        </Row>
      ) : (
        <Row>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography color="secondary">{t('status')}</Typography>

            {wasApproved && (
              <IconButton onClick={onEdit} disabled={!canEdit || saving}>
                <EditOutlined />
              </IconButton>
            )}
            <Tooltip title={t(wasApproved ? 'userStatusTooltip' : 'userStatusApprovalTooltip')}>
              <InfoIcon />
            </Tooltip>
          </Stack>
          <UserStatus status={enabled} />
        </Row>
      )}
    </Row>
  );
};

export default UserStatusChange;

const InfoIcon = styled(InfoCircleOutlined)(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.info.main
}));
