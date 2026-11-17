import StopOutlined from '@ant-design/icons/StopOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import { IconButton, Stack, styled, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface DeletionSafeGuardProps {
  approve: () => void;
  cancel: () => void;
  isLoading?: boolean;
}

export const SafeguardButton = styled(IconButton)(({ theme }) => ({
  fontSize: 14,

  [theme.breakpoints.up('sm')]: {
    fontSize: 16
  },
  [theme.breakpoints.up('md')]: {
    fontSize: 18
  }
}));

const DeletionSafeGuard = ({ approve, cancel, isLoading = false }: DeletionSafeGuardProps) => {
  const { t } = useTranslation();

  return (
    <Stack direction="row" sx={{ flexWrap: 'wrap' }}>
      <Tooltip title={t('cancel')}>
        <SafeguardButton loading={isLoading} color="secondary" onClick={cancel}>
          <StopOutlined />
        </SafeguardButton>
      </Tooltip>
      <Tooltip title={t('delete')}>
        <SafeguardButton loading={isLoading} color="error" onClick={approve}>
          <DeleteOutlined />
        </SafeguardButton>
      </Tooltip>
    </Stack>
  );
};

export default DeletionSafeGuard;
