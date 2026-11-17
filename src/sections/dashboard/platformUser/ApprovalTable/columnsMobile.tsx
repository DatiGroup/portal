import { ColumnDef } from '@tanstack/react-table';
import ReferenceUser from '../../../../components/RefenceUser';
import { formatDateString } from 'utils/dateUtils';
import { ApprovalType } from 'store/slices/platformUsers/platformUserTypes';
import { Box, Stack, Typography } from '@mui/material';
import { Row } from '../components/Row';
import { TFunction } from 'i18next';
import ApprovalAction from './ApprovalAction';
export function columnsMobile({ t }: { t: TFunction }): ColumnDef<ApprovalType>[] {
  return [
    {
      id: 'approvalStatus',
      header: t('approvalStatus'),
      cell: ({ row }) => {
        const approval = row.original;

        return (
          <Stack rowGap={1}>
            <Box>
              <ApprovalAction action={approval.action} />
            </Box>
            <Stack sx={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography variant="body2">{t('iam.approver')}</Typography>
              <Box textAlign="right">
                <ReferenceUser user={approval.approvedByUser} />
              </Box>
            </Stack>
            <Row>
              <Typography variant="body2">{t('comments')}</Typography>
              <Typography variant="body2" color="text.secondary">
                {approval.comments}
              </Typography>
            </Row>
            <Row>
              <Typography variant="body2">{t('actedAt')}</Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDateString(approval.actedAt)}
              </Typography>
            </Row>
          </Stack>
        );
      }
    }
  ];
}
