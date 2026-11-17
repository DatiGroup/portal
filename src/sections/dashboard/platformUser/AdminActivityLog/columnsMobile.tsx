import { ColumnDef } from '@tanstack/react-table';
import ReferenceUser from '../../../../components/RefenceUser';
import { AdminActivityType } from 'store/slices/platformUsers/platformUserTypes';
import { Box, Stack, Typography } from '@mui/material';
import { Row } from '../components/Row';
import { TFunction } from 'i18next';
import { normalizeString } from 'utils/formatString';
import AdminActivityDetails from './AdminActivityDetails';
import DateTime from 'components/DateTime';
import { MobileCard } from '../components/MobileCard';
export function columnsMobile({ t }: { t: TFunction }): ColumnDef<AdminActivityType>[] {
  return [
    {
      id: 'adminActivityLogId',
      header: t('accessManagementLog'),
      cell: ({ row }) => {
        const item = row.original;

        return (
          <MobileCard>
            <Row>
              <Typography variant="body2">{t('action')}</Typography>
              <Typography variant="body2" color="text.secondary">
                {t(`AdminActionEnum.${item.action}`, normalizeString(item.action))}
              </Typography>
            </Row>
            <Row>
              <Typography variant="body2">{t('details')}</Typography>
              <AdminActivityDetails details={item.details} />
            </Row>
            <Stack sx={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography variant="body2">{t('iam.approver')}</Typography>
              <Box textAlign="right">
                <ReferenceUser user={item.createdByUser} />
              </Box>
            </Stack>
            <Row>
              <Typography variant="body2">{t('actedAt')}</Typography>
              <Typography variant="body2" color="text.secondary">
                <DateTime dateString={item.createdDate} />
              </Typography>
            </Row>
          </MobileCard>
        );
      }
    }
  ];
}
