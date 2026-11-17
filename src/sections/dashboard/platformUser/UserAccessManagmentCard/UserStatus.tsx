import { Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
  status?: boolean;
}

const UserStatus = ({ status }: Props) => {
  const { t } = useTranslation();

  if (status) return <Chip color="success" label={t('enabled')} size="small" />;
  if (status === false) return <Chip color="error" label={t('disabled')} size="small" />;
  return <Chip label={t('unknown')} size="small" />;
};

export default UserStatus;
