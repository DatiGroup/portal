import { TableCell, TableHead, TableRow } from '@mui/material';
import { HeaderGroup } from '@tanstack/react-table';
import { Filter } from 'components/third-party/react-table';

const FilterHeader = ({ tableInstance: table }: { tableInstance: any }) => (
  <TableHead>
    {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <TableCell key={header.id} {...header.column.columnDef.meta}>
            {header.column.getCanFilter() && <Filter column={header.column} table={table} />}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableHead>
);

export default FilterHeader;
