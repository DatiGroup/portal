import { TableContainer, Paper, Table } from '@mui/material';
import { Stack } from '@mui/system';
import {
  ColumnFiltersState,
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { DebouncedInput, CSVExport, SelectColumnSorting } from 'components/third-party/react-table';
import { useState } from 'react';
import { LabelKeyObject } from 'react-csv/lib/core';
import { defaultOptions, ReactTableProps, TableOptions } from 'types/tableTypes';
import { fuzzyFilter } from 'utils/filters';
import FilterHeader from 'components/tables/filteringTable/components/FilterHeader';
import SortHeader from 'components/tables/filteringTable/components/SortHeader';
import TBody from 'components/tables/filteringTable/components/TableBody';
import TPagination from 'components/tables/filteringTable/components/TPagination';
import TFooter from 'components/tables/filteringTable/components/TFooter';
import SimpleHeader from 'components/tables/filteringTable/components/SimpleHeader';

const FilteringTable = ({
  data,
  columns,
  options,
  canExpand,
  editable,
  renderSubComponent,
  renderSubRows,
  onRowClick,
  headerAdditions
}: ReactTableProps) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const tableOptions: TableOptions = { ...defaultOptions, ...options };
  const {
    enableGlobalSort,
    enableColumnSort,
    enableHeader,
    enableGlobalFilter,
    enableColumnFilter,
    enablePagination,
    enableFooter,
    enableCSVExport,
    expanded
  } = tableOptions;

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
    state: {
      columnFilters,
      globalFilter,
      sorting
    },
    initialState: {
      expanded: expanded as ExpandedState,
      pagination: {
        pageSize: 10
      }
    },
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getRowCanExpand: (row) => (typeof canExpand === 'function' ? canExpand(row) : !!canExpand)
  });

  const headers: LabelKeyObject[] = [];
  table.getAllColumns().map((columns) =>
    headers.push({
      label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
      // @ts-expect-error Type 'string | undefined' is not assignable to type 'string'.
      key: columns.columnDef.accessorKey
    })
  );

  const showActionHeader = enableGlobalFilter || enableGlobalSort || enableCSVExport || headerAdditions;

  return (
    <MainCard sx={{ width: '100%' }} content={false}>
      {showActionHeader ? (
        <Stack direction="row" sx={{ gap: 2, alignItems: 'center', justifyContent: 'space-between', p: 2, flexWrap: 'wrap' }}>
          <Stack
            direction="row"
            sx={{
              gap: { xs: 1, sm: 2 },
              alignItems: 'center',
              justifyContent: { xs: 'space-between', sm: 'flex-end' },
              sm: { pl: 1 }
            }}
          >
            {enableGlobalFilter && (
              <DebouncedInput
                value={globalFilter ?? ''}
                onFilterChange={(value) => setGlobalFilter(String(value))}
                placeholder={`Search ${data.length} records...`}
              />
            )}
            {enableGlobalSort && <SelectColumnSorting {...{ getState: table.getState, getAllColumns: table.getAllColumns, setSorting }} />}
            {enableCSVExport && (
              <CSVExport {...{ data: table.getSortedRowModel().rows.map((d) => d.original), headers, filename: 'Lookups.csv' }} />
            )}
          </Stack>
          {headerAdditions && <>{headerAdditions && [...headerAdditions]}</>}
        </Stack>
      ) : null}
      <ScrollX>
        <TableContainer component={Paper}>
          <Table>
            {enableHeader && (enableColumnSort ? <SortHeader tableInstance={table} /> : <SimpleHeader tableInstance={table} />)}
            {enableColumnFilter && <FilterHeader tableInstance={table} />}
            <TBody tableInstance={table} onRowClick={onRowClick} renderSubComponent={renderSubComponent} renderSubRows={renderSubRows} />
            {enableFooter && <TFooter tableInstance={table} />}
          </Table>
        </TableContainer>
        {enablePagination && <TPagination tableInstance={table} />}
      </ScrollX>
    </MainCard>
  );
};

export default FilteringTable;
