import { Stack } from '@mui/system';
import PlatformUserList from './PlatformUserList';
import AdminEmail from './AdminEmail';
import { useGetAdminEmailQuery } from 'store/slices/platformUsers/platformUserSlice';
import { ScreenLoading } from 'components/ScreenLoading';
import useSocketUserResource from 'socket/hooks/useSocketUserResource';

const PlatformUserView = () => {
  const { data, isLoading } = useGetAdminEmailQuery();

  useSocketUserResource();

  if (isLoading) return <ScreenLoading />;
  return (
    <Stack gap={2}>
      <AdminEmail email={data?.email || ''} />
      <PlatformUserList />
    </Stack>
  );
};

export default PlatformUserView;
