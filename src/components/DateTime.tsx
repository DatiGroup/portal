import { Stack, Typography } from '@mui/material';
import { formatDate, formatDateString } from 'utils/dateUtils';

interface Props {
  dateString?: string;
}

const DateTime = ({ dateString }: Props) => {
  if (!dateString) return null;

  return (
    <Stack direction="row" columnGap={1}>
      <Typography variant="body2">{formatDateString(dateString)}</Typography>
      <Typography variant="body2" color="text.secondary">
        {formatDateString(dateString, formatDate.time)}
      </Typography>
    </Stack>
  );
};

export default DateTime;
