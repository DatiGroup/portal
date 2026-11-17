import FilteringTable from 'components/tables/filteringTable/FilteringTable';
import LookupAddTranslationSubTable from 'sections/dashboard/lookups/lookupAdd/components/LookupAddTranslationSubTable';
import LookupAddTranslationCell from 'sections/dashboard/lookups/lookupAdd/components/LookupAddTranslationCell';
import LookupAddTranslationHeader from 'sections/dashboard/lookups/lookupAdd/components/LookupAddTranslationHeader';
import useLookupAdd from 'sections/dashboard/lookups/lookupAdd/hooks/useLookupAdd';

const LookupAddTranslationTable = () => {
  const { cellState, columns } = useLookupAdd();
  const [data, setData] = cellState;

  return (
    <>
      <FilteringTable
        {...{
          columns,
          data,
          editable: {
            setData: setData,
            cellComponent: LookupAddTranslationCell
          },
          canExpand: true,
          options: {
            expanded: true
          },
          renderSubRows: (row) => <LookupAddTranslationSubTable data={row.original} />,
          headerAdditions: [<LookupAddTranslationHeader key="lookup-add-header" />]
        }}
      />
    </>
  );
};

export default LookupAddTranslationTable;
