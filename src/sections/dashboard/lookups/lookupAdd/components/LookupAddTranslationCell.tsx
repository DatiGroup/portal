import { ColumnDef, Row, RowData, Table } from '@tanstack/react-table';
import { useContext, useEffect, useState } from 'react';
import { Field } from 'components/hook-form/fields';
import { LookupAddContextType, RowContent } from 'sections/dashboard/lookups/lookupAdd/types/lookupAddTypes';
import { LookupAddContext } from 'sections/dashboard/lookups/lookupAdd/context/LookupAddContextProvider';

type CellEditProps<T extends RowData> = {
  getValue: () => RowData;
  row: Row<RowContent>;
  column: ColumnDef<RowContent> | any;
  table: Table<T>;
};

const LookupAddTranslationCell = <T extends RowData>({
  getValue: initialValue,
  row: { index, original },
  column: { id, columnDef },
  table
}: CellEditProps<T>) => {
  const { valueState, handleInput } = useContext<LookupAddContextType>(LookupAddContext);
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

export default LookupAddTranslationCell;
