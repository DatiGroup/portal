import { ColumnDef } from '@tanstack/react-table';
import FilteringTable from 'components/tables/filteringTable/FilteringTable';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { ScreenLoading } from 'components/ScreenLoading';
import { ScreenError } from 'components/ScreenError';
import { formatDateString } from 'utils/dateUtils';
import InvitationStatus from './components/InvitationStatus';
import { Chip } from '@mui/material';
import { OrgUserDataType } from 'store/slices/organizations/organizationTypes';
import { useOrganizationUserListQuery } from 'store/slices/organizations/organizationSlice';

const OrgUserView = () => {
  const { data, isLoading, isError } = useOrganizationUserListQuery();
  const { t } = useTranslation();
  const columns = useMemo<ColumnDef<OrgUserDataType>[]>(
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
        header: t('org.relEndDate'),
        accessorKey: 'relationships.endDateActive',
        accessorFn: (row) => (row.lastRelationship?.endDateActive ? formatDateString(row.lastRelationship.endDateActive) : '')
      },
      {
        header: t('org.owner'),
        accessorKey: 'ownedOrganization',
        cell: (cell) =>
          cell.row.original?.ownedOrganization?.rootUserId === cell.row.original?.userId ? (
            <Chip color="success" label={t('org.owner')} size="small" variant="light" />
          ) : null
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

export default OrgUserView;
