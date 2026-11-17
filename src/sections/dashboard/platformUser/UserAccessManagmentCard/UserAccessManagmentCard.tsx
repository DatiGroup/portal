import { Stack } from '@mui/material';
import MainCard from 'components/MainCard';
import { useTranslation } from 'react-i18next';
import { UserIAMType } from 'store/slices/platformUsers/platformUserTypes';
import useCanEditUser from '../hooks/useCanEditUser';
import UserStatusChange from './UserStatusChange';
import UserRoleChange from './UserRoleChange';

interface Props {
  userId: number;
  data: UserIAMType | undefined;
}

const UserAccessManagmentCard = ({ userId, data }: Props) => {
  const { t } = useTranslation();
  const { canEdit } = useCanEditUser();
  return (
    <MainCard title={t('accessManagement')}>
      <Stack rowGap={1}>
        <UserStatusChange userId={userId} enabled={data?.enabled} wasApproved={data?.wasApproved} canEdit={canEdit} />
        <UserRoleChange userId={userId} data={data} canEdit={canEdit} />
      </Stack>
    </MainCard>
  );
};

export default UserAccessManagmentCard;
