import TableSubRows from 'components/tables/filteringTable/components/TableSubRows';
import LookupAddTranslationCell from 'sections/dashboard/lookups/lookupAdd/components/LookupAddTranslationCell';
import { RowContent } from 'sections/dashboard/lookups/lookupAdd/types/lookupAddTypes';
import useLookupAddSub from 'sections/dashboard/lookups/lookupAdd/hooks/useLookupAddSub';

interface Props {
  data: RowContent;
}

const LookupAddTranslationSubTable = ({ data: parentRow }: Props) => {
  const { cellState, columns } = useLookupAddSub();
  const [data, setData] = cellState;

  return (
    <>
      <TableSubRows
        {...{
          columns,
          data,
          editable: {
            setData: setData,
            cellComponent: LookupAddTranslationCell
          }
        }}
      />
    </>
  );
};

export default LookupAddTranslationSubTable;
