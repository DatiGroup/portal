import { ColumnDef } from '@tanstack/react-table';
import ApprovalStatus from '../components/ApprovalStatus';
import ReferenceUser from '../../../../components/RefenceUser';
import { formatDateString } from 'utils/dateUtils';
import { ApprovalRequestsType } from 'store/slices/platformUsers/platformUserTypes';
import { ApprovalRequestStatusEnum } from 'store/type/ApprovalRequestStatusEnum';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { Row } from '../components/Row';
import DownOutlined from '@ant-design/icons/DownOutlined';
import UpOutlined from '@ant-design/icons/UpOutlined';
export function columnsMobile({
  t,
  canEdit,
  handleApproval,
  onReject
}: {
  t: (key: string) => string;
  canEdit: boolean;
  handleApproval: (requestId: number) => void;
  onReject: (row: ApprovalRequestsType) => void;
}): ColumnDef<ApprovalRequestsType>[] {
  return [
    {
      id: 'approvalStatus',
      header: t('iam.approvalRequests'),
      cell: ({ row }) => {
        const approval = row.original;
        const enabled = canEdit && row.original.status === ApprovalRequestStatusEnum.PENDING;
        const collapseIcon = row.getCanExpand() && row.getIsExpanded() ? <UpOutlined /> : <DownOutlined />;

        return (
          <Stack rowGap={1}>
            <Box>
              <ApprovalStatus status={approval.status} />
            </Box>
            <Row>
              <Typography variant="body2">{t('assignedToUser')}</Typography>
              <ReferenceUser user={approval.assignedToUser} />
            </Row>

            <Row>
              <Typography variant="body2">{t('assignedToKcGroup')}</Typography>
              <Typography variant="body2" color="text.secondary">
                {approval.assignedToKcGroup}
              </Typography>
            </Row>
            <Row>
              <Typography variant="body2">{t('minRequiredApprovals')}</Typography>
              <Typography variant="body2" color="text.secondary">
                {approval.minRequiredApprovals}
              </Typography>
            </Row>
            <Row>
              <Typography variant="body2">{t('createdDate')}</Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDateString(approval.createdDate)}
              </Typography>
            </Row>
            <Row>
              <Button disabled={!enabled} variant="contained" size="small" onClick={() => handleApproval(row.original.approvalRequestId)}>
                {t('approve')}
              </Button>
              <Button disabled={!enabled} variant="outlined" size="small" onClick={() => onReject(row.original)}>
                {t('reject')}
              </Button>
            </Row>
            <Row onClick={row.getToggleExpandedHandler()}>
              <Typography variant="body2" color="primary">
                {t('iam.seeApprovalRequests')}
              </Typography>
              <IconButton color={'primary'}>{collapseIcon}</IconButton>
            </Row>
          </Stack>
        );
      }
    }
  ];
}
