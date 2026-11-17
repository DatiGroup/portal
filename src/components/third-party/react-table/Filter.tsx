// material-ui
import Stack from '@mui/material/Stack';

// third-party
import { Column, RowData, Table } from '@tanstack/react-table';

// project imports
import DebouncedInput from './DebouncedInput';

// assets
import MinusOutlined from '@ant-design/icons/MinusOutlined';

// ==============================|| FILTER - NUMBER FIELD ||============================== //

type NumberInputProps = {
  columnFilterValue: [number, number];
  getFacetedMinMaxValues: () => [number, number] | undefined;
  setFilterValue: (updater: any) => void;
};

function NumberInput({ columnFilterValue, getFacetedMinMaxValues, setFilterValue }: NumberInputProps) {
  const minOpt = getFacetedMinMaxValues()?.[0];
  const min = Number(minOpt ?? '');

  const maxOpt = getFacetedMinMaxValues()?.[1];
  const max = Number(maxOpt);

  return (
    <Stack direction="column" sx={{ gap: 1, alignItems: 'center' }}>
      <DebouncedInput
        type="number"
        value={columnFilterValue?.[0] ?? ''}
        onFilterChange={(value) => setFilterValue((old: [number, number]) => [value, old?.[1]])}
        placeholder={`Min ${minOpt ? `(${min})` : ''}`}
        fullWidth
        slotProps={{ input: { min: min, max: max } }}
        size="small"
        startAdornment={false}
      />
      <>
        <MinusOutlined />
      </>
      <DebouncedInput
        type="number"
        value={columnFilterValue?.[1] ?? ''}
        onFilterChange={(value) => setFilterValue((old: [number, number]) => [old?.[0], value])}
        placeholder={`Max ${maxOpt ? `(${max})` : ''}`}
        fullWidth
        slotProps={{ input: { min: min, max: max } }}
        size="small"
        startAdornment={false}
      />
    </Stack>
  );
}

// ==============================|| FILTER - DATE RANGE FIELD ||============================== //

type DateRangeInputProps = {
  columnFilterValue: [string, string];
  setFilterValue: (updater: any) => void;
};

function DateRangeInput({ columnFilterValue, setFilterValue }: DateRangeInputProps) {
  const startDate = columnFilterValue?.[0] ?? '';
  const endDate = columnFilterValue?.[1] ?? '';

  return (
    <Stack direction="column" sx={{ gap: 1, alignItems: 'center' }}>
      <DebouncedInput
        type="date"
        value={startDate}
        onFilterChange={(value) => setFilterValue((old: [string, string]) => [value, old?.[1]])}
        fullWidth
        size="small"
        startAdornment={false}
      />
      <>
        <MinusOutlined />
      </>
      <DebouncedInput
        type="date"
        value={endDate}
        onFilterChange={(value) => setFilterValue((old: [string, string]) => [old?.[0], value])}
        fullWidth
        size="small"
        startAdornment={false}
      />
    </Stack>
  );
}

// ==============================|| FILTER - TEXT FIELD ||============================== //

type TextInputProps = {
  columnId: string;
  columnFilterValue: string;
  setFilterValue: (updater: any) => void;
  header?: string;
};

function TextInput({ columnId, columnFilterValue, header, setFilterValue }: TextInputProps) {
  const dataListId = columnId + 'list';

  return (
    <DebouncedInput
      type="text"
      fullWidth
      value={columnFilterValue ?? ''}
      onFilterChange={(value) => setFilterValue(value)}
      placeholder={`${header}`}
      slotProps={{ input: { list: dataListId } }}
      size="small"
      startAdornment={false}
    />
  );
}

// ==============================|| FILTER - INPUT ||============================== //

type Props<T extends RowData> = {
  column: Column<T, unknown>;
  table: Table<T>;
};

export default function Filter<T extends RowData>({ column, table }: Props<T>) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);
  const columnFilterValue = column.getFilterValue();
  const filterVariant = (column.columnDef.meta as any)?.filtervariant;

  return typeof firstValue === 'number' ? (
    <NumberInput
      columnFilterValue={columnFilterValue as [number, number]}
      getFacetedMinMaxValues={column.getFacetedMinMaxValues}
      setFilterValue={column.setFilterValue}
    />
  ) : filterVariant === 'dateRange' ? (
    <DateRangeInput columnFilterValue={columnFilterValue as [string, string]} setFilterValue={column.setFilterValue} />
  ) : (
    <TextInput
      columnId={column.id}
      columnFilterValue={columnFilterValue as string}
      setFilterValue={column.setFilterValue}
      header={column.columnDef.header as string}
    />
  );
}
