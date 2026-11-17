import { ColumnDef, Row, RowData, Table } from '@tanstack/react-table';
import { ValueAddContext } from 'sections/dashboard/lookups/lookupValueAdd/context/ValueAddContextProvider';
import { useContext, useEffect, useState } from 'react';
import { Field } from 'components/hook-form/fields';
import { LookupValueAddContextType, RowContent } from 'sections/dashboard/lookups/lookupValueAdd/types/valueAddTypes';

type CellEditProps<T extends RowData> = {
  getValue: () => RowData;
  row: Row<RowContent>;
  column: ColumnDef<RowContent> | any;
  table: Table<T>;
};

const ValueAddTranslationCell = <T extends RowData>({
  getValue: initialValue,
  row: { index, original },
  column: { id, columnDef },
  table
}: CellEditProps<T>) => {
  const { valueState, handleInput } = useContext<LookupValueAddContextType>(ValueAddContext);
  const [valueInput] = valueState!;

  const [value, setValue] = useState(initialValue);

  const onChange = (e: any) => {
    setValue(e.target?.value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  let element;

  switch (columnDef.dataType) {
    case 'text':
      element = (
        <Field.Text
          name={`${columnDef.accessorKey}_${original.languageCode}`}
          label={`${original.languageName} ${columnDef.header} *`}
          value={valueInput[`${columnDef.accessorKey}_${original.languageCode}`]}
          onChange={(e) => {
            handleInput(e);
            onChange(e);
          }}
        />
      );
      break;
    default:
      element = <span>{value as string}</span>;
      break;
  }

  return element;
};

export default ValueAddTranslationCell;
