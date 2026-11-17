import { TableBody, TableCell, TableRow } from '@mui/material';
import { flexRender } from '@tanstack/react-table';
import { EmptyTable } from 'components/third-party/react-table';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  tableInstance: any;
  onRowClick?: (row: any) => void;
  renderSubComponent?: (row: any) => React.ReactNode;
  renderSubRows?: (row: any) => React.ReactNode;
}

const TBody = ({ tableInstance: table, onRowClick, renderSubComponent, renderSubRows }: Props) => {
  const { t } = useTranslation();
  return (
    <TableBody>
      {table.getRowModel().rows.length > 0 ? (
        table.getRowModel().rows.map((row: any) => (
          <React.Fragment key={row.id}>
            <TableRow key={row.id} onClick={() => onRowClick && onRowClick(row)} sx={onRowClick ? { cursor: 'pointer' } : undefined}>
              {row.getVisibleCells().map((cell: any) => (
                <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
            {row.getIsExpanded() && renderSubComponent && (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length}>{renderSubComponent(row)}</TableCell>
              </TableRow>
            )}
            {row.getIsExpanded() && renderSubRows && renderSubRows(row)}
          </React.Fragment>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={table.getAllColumns().length}>
            <EmptyTable msg={t('noData')} />
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default TBody;
