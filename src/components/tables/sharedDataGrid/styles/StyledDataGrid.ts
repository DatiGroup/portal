import { styled } from '@mui/material/styles';
import { DataGrid, type DataGridProps, type GridValidRowModel } from '@mui/x-data-grid';
import type { JSX } from 'react';

export const StyledComponent = styled(DataGrid, {
  shouldForwardProp: (prop) => prop !== 'clickable'
})<{ clickable?: boolean }>(({ clickable }) => ({
  '& .MuiDataGrid-row': {
    cursor: clickable ? 'pointer' : 'default'
  }
}));

export const StyledDataGridContainer = StyledComponent as <T extends GridValidRowModel>(
  props: DataGridProps<T> & { clickable?: boolean }
) => JSX.Element;
