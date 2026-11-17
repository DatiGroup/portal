import EyeOutlined from '@ant-design/icons/EyeOutlined';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { ColumnDef, Row } from '@tanstack/react-table';
import FilteringTable from 'components/tables/filteringTable/FilteringTable';
import { useTranslation } from 'react-i18next';
import { usePlatformUserListQuery } from 'store/slices/platformUsers/platformUserSlice';
import { PlatformUserType } from 'store/slices/platformUsers/platformUserTypes';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { routePaths } from 'routes/routePaths';
import ApprovalStatus from './components/ApprovalStatus';
import { ScreenLoading } from 'components/ScreenLoading';
import { ScreenError } from 'components/ScreenError';

const OrgMemberView = () => {
  const { data, isLoading, isError } = usePlatformUserListQuery();
  const { t } = useTranslation();
  const navigation = useNavigate();
  const openDetail = useCallback(
    (id: string | number) => {
      navigation(routePaths.dashboard.tool.platformUsers.details(id));
    },
    [navigation]
  );

  const columns = useMemo<ColumnDef<PlatformUserType>[]>(
    () => [
      {
        header: t('userName'),
        accessorKey: 'userName'
      },
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
        header: t('approvalStatus'),
        accessorKey: 'approvalStatus',
        cell: (cell) => {
          return <ApprovalStatus status={cell.row.original.approvalStatus} />;
        }
      },
      {
        header: 'Actions',
        meta: {
          className: 'cell-center'
        },
        disableSortBy: true,
        cell: ({ row }) => {
          return (
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <Tooltip title={t('view')}>
                <IconButton onClick={() => openDetail(row.original.userId)}>
                  <EyeOutlined />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        }
      }
    ],
    [openDetail, t]
  );

  const onRowClick = (row: Row<any>) => {
    openDetail(row.original.userId);
  };

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
        },
        onRowClick: onRowClick
      }}
    />
  );
};

export default OrgMemberView;
