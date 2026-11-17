import { TableCell, TableFooter, TableRow } from '@mui/material';
import { flexRender } from '@tanstack/react-table';

const TFooter = ({ tableInstance: table }: { tableInstance: any }) => (
  <TableFooter>
    {table.getFooterGroups().map((footerGroup: any) => (
      <TableRow key={footerGroup.id}>
        {footerGroup.headers.map((footer: any) => (
          <TableCell key={footer.id} {...footer.column.columnDef.meta}>
            {footer.isPlaceholder ? null : flexRender(footer.column.columnDef.header, footer.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableFooter>
);

export default TFooter;
