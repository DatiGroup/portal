import TableSubRows from 'components/tables/filteringTable/components/TableSubRows';
import ValueAddTranslationCell from 'sections/dashboard/lookups/lookupValueAdd/components/ValueAddTranslationCell';
import useValueAddSub from 'sections/dashboard/lookups/lookupValueAdd/hooks/useValueAddSub';
import { RowContent } from 'sections/dashboard/lookups/lookupValueAdd/types/valueAddTypes';

interface Props {
  data: RowContent;
}

const ValueAddTranslationSubTable = ({ data: parentRow }: Props) => {
  const { cellState, columns } = useValueAddSub();
  const [data, setData] = cellState;

  return (
    <>
      <TableSubRows
        {...{
          columns,
          data,
          editable: {
            setData: setData,
            cellComponent: ValueAddTranslationCell
          }
        }}
      />
    </>
  );
};

export default ValueAddTranslationSubTable;
