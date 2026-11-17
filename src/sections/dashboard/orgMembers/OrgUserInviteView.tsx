import { ColumnDef } from '@tanstack/react-table';
import FilteringTable from 'components/tables/filteringTable/FilteringTable';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { ScreenLoading } from 'components/ScreenLoading';
import { ScreenError } from 'components/ScreenError';
import { useInvitationListQuery } from 'store/slices/invitation/invitationSlice';
import { InvitationDataType } from 'store/slices/invitation/invitationTypes';
import { formatDateString } from 'utils/dateUtils';
import InvitationStatus from './components/InvitationStatus';
import CreateInvitation from './createInvitation/CreateInvitation';
import InvitationActions from './components/InvitationActions';

const OrgUserInviteView = () => {
  const { data, isLoading, isError } = useInvitationListQuery();
  const { t } = useTranslation();
  const columns = useMemo<ColumnDef<InvitationDataType>[]>(
    () => [
      {
        header: t('email'),
        accessorKey: 'email'
      },
      {
        header: t('fullName'),
        accessorKey: 'name',
        accessorFn: (row) => `${[row.profile.firstName, row.profile.lastName].filter((p) => !!p).join(' ')}`
      },
      {
        header: t('invitation.status'),
        accessorKey: 'lastInvitation',
        cell: (cell) => <InvitationStatus invitation={cell.row.original?.lastInvitation} />
      },

      {
        header: t('expiredDate'),
        accessorKey: 'invitation.expiredDate',
        accessorFn: (row) => (row.lastInvitation?.expiredDate ? formatDateString(row.lastInvitation.expiredDate) : '')
      },
      {
        id: 'actions',
        header: t('action'),
        cell: (cell) => <InvitationActions invitation={cell.row.original?.lastInvitation} />,
        enableSorting: false,
        enableColumnFilter: false,
        enableGlobalFilter: false
      }
    ],
    [t]
  );

  if (isLoading) return <ScreenLoading />;
  if (isError) return <ScreenError />;

  return (
    <FilteringTable
      {...{
        data: data || [],
        columns,
        headerAdditions: [<CreateInvitation />],
        options: {
          enableGlobalSort: true,
          enableColumnSort: true,
          enableGlobalFilter: true,
          // enableColumnFilter: true,
          enablePagination: true
          //enableCSVExport: true
        }
      }}
    />
  );
};

export default OrgUserInviteView;
