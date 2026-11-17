import { Box, Chip, ChipProps, ChipPropsColorOverrides, useTheme } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import { ResourceRequestStatusEnum } from 'types/resourceTypes';

interface ResourceOrderChipProps {
  status: ResourceRequestStatusEnum;
  showDot?: boolean;
}

interface StatusChipProps {
  label: string;
  color: OverridableStringUnion<'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning', ChipPropsColorOverrides>;
  showDot: boolean;
}

const StatusChip = ({ label, color, showDot }: StatusChipProps) => {
  const theme = useTheme();

  const dotColor = color === 'default' ? theme.palette.secondary.main : theme.palette[color].main;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Chip
        color={color}
        label={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {showDot && (
              <Box
                sx={{
                  width: '0.5rem',
                  height: '0.5rem',
                  borderRadius: '50%',
                  backgroundColor: dotColor,
                  display: 'inline-block',
                  marginRight: 1
                }}
              />
            )}
            {label}
          </Box>
        }
        size="small"
        variant="light"
      />
    </Box>
  );
};

const ResourceOrderChip = ({ status, showDot = false }: ResourceOrderChipProps) => {
  switch (status) {
    case ResourceRequestStatusEnum.NEW:
      return <StatusChip label={status} color="primary" showDot={showDot} />;
    case ResourceRequestStatusEnum.PENDING:
      return <StatusChip label={status} color="warning" showDot={showDot} />;
    case ResourceRequestStatusEnum.SUCCESS:
      return <StatusChip label={status} color="success" showDot={showDot} />;
    case ResourceRequestStatusEnum.FAILED:
      return <StatusChip label={status} color="error" showDot={showDot} />;
    case ResourceRequestStatusEnum.DUPLICATE:
      return <StatusChip label={status} color="info" showDot={showDot} />;
    case ResourceRequestStatusEnum.RETRY:
      return <StatusChip label={status} color="info" showDot={showDot} />;
    default:
      return <StatusChip label="Unknown" color="default" showDot={showDot} />;
  }
};

export default ResourceOrderChip;
