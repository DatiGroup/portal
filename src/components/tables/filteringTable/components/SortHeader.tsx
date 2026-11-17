import { Box, Stack, TableCell, TableHead, TableRow } from '@mui/material';
import { flexRender, HeaderGroup } from '@tanstack/react-table';
import { HeaderSort } from 'components/third-party/react-table';

const SortHeader = ({ tableInstance: table }: { tableInstance: any }) => (
  <TableHead>
    {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
          if (header.column.columnDef.meta !== undefined && header.column.getCanSort()) {
            Object.assign(header.column.columnDef.meta, {
              className: header.column.columnDef.meta.className + ' cursor-pointer prevent-select'
            });
          }

          return (
            <TableCell
              key={header.id}
              {...header.column.columnDef.meta}
              onClick={header.column.getToggleSortingHandler()}
              {...(header.column.getCanSort() &&
                header.column.columnDef.meta === undefined && {
                  className: 'cursor-pointer prevent-select'
                })}
            >
              {header.isPlaceholder ? null : (
                <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                  <Box>{flexRender(header.column.columnDef.header, header.getContext())}</Box>
                  {header.column.getCanSort() && <HeaderSort column={header.column} />}
                </Stack>
              )}
            </TableCell>
          );
        })}
      </TableRow>
    ))}
  </TableHead>
);

export default SortHeader;
