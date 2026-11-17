import { ColumnDef } from '@tanstack/react-table';
import ApprovalStatus from '../components/ApprovalStatus';
import ReferenceUser from '../../../../components/RefenceUser';
import { formatDateString } from 'utils/dateUtils';
import { ApprovalRequestsType } from 'store/slices/platformUsers/platformUserTypes';
import { ApprovalRequestStatusEnum } from 'store/type/ApprovalRequestStatusEnum';
import { Button, IconButton, Stack } from '@mui/material';
import DownOutlined from '@ant-design/icons/DownOutlined';
import UpOutlined from '@ant-design/icons/UpOutlined';

export function columnsDesktop({
  t,
  canEdit,
  handleApproval,
  onReject
}: {
  t: (key: string) => string;
  canEdit: boolean;
  handleApproval: (requestId: number, option: 'approve' | 'reject', comment?: string) => void;
  onReject: (row: ApprovalRequestsType) => void;
}): ColumnDef<ApprovalRequestsType>[] {
  return [
    {
      header: t('approvalStatus'),
      accessorKey: 'status',
      cell: (cell) => <ApprovalStatus status={cell.row.original.status} />
    },
    {
      header: t('assignedToKcGroup'),
      accessorKey: 'assignedToKcGroup'
    },
    {
      header: t('assignedToUser'),
      accessorKey: 'assignedToUser',
      cell: (cell) => <ReferenceUser user={cell.row.original.assignedToUser} />
    },
    {
      header: t('minRequiredApprovals'),
      accessorKey: 'minRequiredApprovals'
    },
    {
      header: t('currentApprovalsCount'),
      accessorKey: 'currentApprovalsCount'
    },
    {
      header: t('createdDate'),
      accessorKey: 'createdDate',
      accessorFn: (row) => formatDateString(row.createdDate)
    },
    {
      header: 'Actions',
      meta: {
        className: 'cell-center'
      },
      cell: ({ row }) => {
        const enabled = canEdit && row.original.status === ApprovalRequestStatusEnum.PENDING;
        const collapseIcon = row.getCanExpand() && row.getIsExpanded() ? <UpOutlined /> : <DownOutlined />;

        return (
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'center', columnGap: 2 }}>
            <Button disabled={!enabled} variant="contained" onClick={() => handleApproval(row.original.approvalRequestId, 'approve')}>
              {t('approve')}
            </Button>
            <Button disabled={!enabled} variant="outlined" onClick={() => onReject(row.original)}>
              {t('reject')}
            </Button>
            <IconButton color={'primary'} onClick={row.getToggleExpandedHandler()}>
              {collapseIcon}
            </IconButton>
          </Stack>
        );
      }
    }
  ];
}
