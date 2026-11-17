import type { GridRowParams, GridValidRowModel, DataGridProps } from '@mui/x-data-grid';
import { StyledDataGridContainer } from 'components/tables/sharedDataGrid/styles/StyledDataGrid';
import { useMemo } from 'react';

interface SharedDataGridProps<T extends GridValidRowModel & { id: string | number }> extends DataGridProps<T> {
  onRowClick?: (params: GridRowParams<T>) => void;
}

export function SharedDataGrid<T extends GridValidRowModel & { id: string | number }>({
  rows,
  columns,
  loading,
  onRowClick,
  sx,
  ...props
}: SharedDataGridProps<T>) {
  const processedRows = useMemo(() => {
    const isUserSortingActive = props.sortModel?.length || props.initialState?.sorting?.sortModel?.length;

    if (isUserSortingActive) {
      return rows || [];
    }

    // If no sorting is specified, display the most recently added entries at the top of the list.
    return [...(rows || [])].reverse();
  }, [rows, props.sortModel, props.initialState]);

  return (
    <StyledDataGridContainer<T>
      clickable={!!onRowClick}
      rows={processedRows}
      columns={columns}
      loading={loading}
      onRowClick={onRowClick}
      getRowId={(row) => row.id}
      disableRowSelectionOnClick
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
        ...props.initialState
      }}
      pageSizeOptions={[20, 50, 100]}
      // Unify default table styling settings with unique tables
      // Default styling defined in separate file for clean code
      sx={{
        ...sx
      }}
      // For declaring unique props if needed
      {...props}
    />
  );
}
