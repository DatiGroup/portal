import { Stack, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';

interface Props {
  details?: Record<string, any>;
}

const AdminActivityDetails = ({ details }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  if (!details) return null;

  return (
    <Stack>
      {details?.addedTo?.length ? (
        <Stack>
          <Typography variant="body2">{t('rolesAdded')}</Typography>
          {details.addedTo.map((p: string) => (
            <Stack direction="row" columnGap={1}>
              <CheckOutlined style={{ color: theme.palette.success.main }} />
              <Typography variant="body2">{p}</Typography>
            </Stack>
          ))}
        </Stack>
      ) : null}
      {details?.removedFrom?.length ? (
        <Stack>
          <Typography variant="body2">{t('rolesRemoved')}</Typography>
          {details.removedFrom.map((p: string) => (
            <Stack direction="row" columnGap={1}>
              <CloseOutlined style={{ color: theme.palette.error.main }} />
              <Typography variant="body2">{p}</Typography>
            </Stack>
          ))}
        </Stack>
      ) : null}
    </Stack>
  );
};

export default AdminActivityDetails;
