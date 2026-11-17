import { ColumnDef } from '@tanstack/react-table';
import ReferenceUser from '../../../../components/RefenceUser';
import { formatDateString } from 'utils/dateUtils';
import { ApprovalType } from 'store/slices/platformUsers/platformUserTypes';
import ApprovalAction from './ApprovalAction';
import { TFunction } from 'i18next';

export function columnsDesktop({ t }: { t: TFunction }): ColumnDef<ApprovalType>[] {
  return [
    {
      header: t('action'),
      accessorKey: 'action',
      cell: (cell) => {
        return <ApprovalAction action={cell.row.original.action} />;
      }
    },
    {
      header: t('actedByUser'),
      accessorKey: 'approvedByUser',
      cell: (cell) => {
        return <ReferenceUser user={cell.row.original.approvedByUser} />;
      }
    },
    {
      header: t('comments'),
      accessorKey: 'comments'
    },
    {
      header: t('actedAt'),
      accessorKey: 'actedAt',
      accessorFn: (row) => formatDateString(row.actedAt)
    }
  ];
}
