import { Stack, Typography } from '@mui/material';
import { ReferenceUserType } from 'store/type/ReferenceUserType';

interface Props {
  user?: ReferenceUserType;
}

const ReferenceUser = ({ user }: Props) => {
  if (!user) return null;

  return (
    <Stack>
      <Typography variant="body2">{`${user?.profile?.firstName ?? ''} ${user?.profile?.lastName ?? ''}`}</Typography>
      <Typography variant="body2" color="text.secondary">
        {user?.email ?? ''}{' '}
      </Typography>
    </Stack>
  );
};

export default ReferenceUser;
