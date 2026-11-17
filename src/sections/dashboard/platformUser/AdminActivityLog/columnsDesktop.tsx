import { ColumnDef } from '@tanstack/react-table';
import ReferenceUser from '../../../../components/RefenceUser';
import { AdminActivityType } from 'store/slices/platformUsers/platformUserTypes';
import { TFunction } from 'i18next';
import AdminActivityDetails from './AdminActivityDetails';
import { normalizeString } from 'utils/formatString';
import DateTime from 'components/DateTime';

export function columnsDesktop({ t }: { t: TFunction }): ColumnDef<AdminActivityType>[] {
  return [
    {
      header: t('action'),
      accessorKey: 'action',
      accessorFn: (row) => t(`AdminActionEnum.${row.action}`, normalizeString(row.action))
    },
    {
      header: t('details'),
      accessorKey: 'details',
      cell: (cell) => {
        return <AdminActivityDetails details={cell.row.original.details} />;
      }
    },
    {
      header: t('actedByUser'),
      accessorKey: 'createdByUser',
      cell: (cell) => {
        return <ReferenceUser user={cell.row.original.createdByUser} />;
      }
    },
    {
      header: t('actedAt'),
      accessorKey: 'createdDate',
      cell: (cell) => {
        return <DateTime dateString={cell.row.original.createdDate} />;
      }
    }
  ];
}
