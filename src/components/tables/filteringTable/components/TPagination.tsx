import { Box, Divider } from '@mui/material';
import { TablePagination } from 'components/third-party/react-table';

const TPagination = ({ tableInstance: table }: { tableInstance: any }) => (
  <>
    <Divider />
    <Box sx={{ p: 2 }}>
      <TablePagination
        {...{
          setPageSize: table.setPageSize,
          setPageIndex: table.setPageIndex,
          getState: table.getState,
          getPageCount: table.getPageCount,
          initialPageSize: table.initialState.pagination.pageSize
        }}
      />
    </Box>
  </>
);

export default TPagination;
