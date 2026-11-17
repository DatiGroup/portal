import { Chip, IconButton, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { GroupPayloadType, UserIAMType } from 'store/slices/platformUsers/platformUserTypes';

import RoleDropdown from './RoleDropdown';
import { useState } from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import { useUpdateUserRolesMutation } from 'store/slices/platformUsers/platformUserSlice';
import { showErrorMessage } from 'utils/alerts';
import { Row } from '../components/Row';

interface Props {
  userId: number;
  canEdit?: boolean;
  data: UserIAMType | undefined;
}

const UserRoleChange = ({ userId, data, canEdit }: Props) => {
  const { t } = useTranslation();
  const [editRoles, setEditRoles] = useState(false);
  const initGroups = data?.groups || [];
  const [value, setValue] = useState<string[]>(initGroups);
  const [updateRoles] = useUpdateUserRolesMutation();
  const [saving, setSaving] = useState(false);

  const onRoleChange = (newValue: string[]) => {
    setValue(newValue);
  };

  const onEdit = () => setEditRoles(true);
  const onSave = async () => {
    try {
      setSaving(true);

      const removedRoles = initGroups.filter((r) => !value.includes(r)).map((groupName) => ({ groupName, action: 'remove' })) || [];
      const addRoles = value.filter((r) => !initGroups.includes(r)).map((groupName) => ({ groupName, action: 'add' })) || [];
      const payload: GroupPayloadType = {
        userId: userId,
        groups: [...removedRoles, ...addRoles]
      };

      await updateRoles(payload).unwrap();
      setEditRoles(false);
    } catch {
      showErrorMessage();
    } finally {
      setSaving(false);
    }
  };
  const onCancel = () => setEditRoles(false);

  const disableSave = value.length === 0 || saving;
  return (
    <Stack rowGap={2}>
      <Row>
        <Typography color="secondary">{t('roles')}</Typography>

        {editRoles ? (
          <Stack direction="row" spacing={1}>
            <IconButton onClick={onSave} disabled={disableSave || !canEdit}>
              <CheckOutlined />
            </IconButton>
            <IconButton onClick={onCancel} disabled={!canEdit}>
              <CloseOutlined />
            </IconButton>
          </Stack>
        ) : (
          <Row>
            <IconButton onClick={onEdit} disabled={!canEdit}>
              <EditOutlined />
            </IconButton>
            <Stack rowGap={1}>{data?.groups?.map((role) => <Chip key={role} label={role} size="small" variant="light" />)}</Stack>
          </Row>
        )}
      </Row>
      {editRoles && <RoleDropdown value={value} onChange={onRoleChange} />}
    </Stack>
  );
};

export default UserRoleChange;
