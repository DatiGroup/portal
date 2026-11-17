import { alpha, Skeleton, TableCell, TableRow } from '@mui/material';
import { flexRender, getCoreRowModel, getExpandedRowModel, useReactTable } from '@tanstack/react-table';
import { TableSubRowsProps } from 'types/tableTypes';

const TableSubRows = ({ columns, data, editable, loading }: TableSubRowsProps) => {
  const table = useReactTable({
    data,
    columns,
    ...(editable && {
      defaultColumn: {
        cell: editable.cellComponent
      }
    }),
    ...(editable && {
      meta: {
        updateData: (rowIndex, columnId, value) => {
          editable.setData((old: any[]) =>
            old.map((row, index) => {
              if (index === rowIndex) {
                return {
                  ...old[rowIndex]!,
                  [columnId]: value
                };
              }
              return row;
            })
          );
        }
      }
    }),
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel()
  });

  if (loading) {
    return (
      <>
        {[0, 1, 2].map((item: number) => (
          <TableRow key={item}>
            <TableCell />
            {[0, 1, 2, 3, 4].map((col: number) => (
              <TableCell key={col}>
                <Skeleton animation="wave" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </>
    );
  }

  return (
    <>
      {table.getRowModel().rows.map((row, index) => (
        <TableRow sx={(theme) => ({ bgcolor: alpha(theme.palette.primary.lighter, 0.35) })} key={index}>
          <TableCell />
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id} {...cell.column.columnDef.meta}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default TableSubRows;
