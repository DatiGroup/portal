import { TableCell, TableHead, TableRow } from '@mui/material';
import { flexRender, HeaderGroup } from '@tanstack/react-table';

const SimpleHeader = ({ tableInstance: table }: { tableInstance: any }) => (
  <TableHead>
    {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <TableCell key={header.id} {...header.column.columnDef.meta}>
            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableHead>
);

export default SimpleHeader;
