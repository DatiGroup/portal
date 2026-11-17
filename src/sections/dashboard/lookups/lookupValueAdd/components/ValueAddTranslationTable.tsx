import FilteringTable from 'components/tables/filteringTable/FilteringTable';
import ValueAddTranslationSubTable from 'sections/dashboard/lookups/lookupValueAdd/components/ValueAddTranslationSubTable';
import ValueAddTranslationCell from 'sections/dashboard/lookups/lookupValueAdd/components/ValueAddTranslationCell';
import ValueAddTranslationHeader from 'sections/dashboard/lookups/lookupValueAdd/components/ValueAddTranslationHeader';
import useValueAdd from 'sections/dashboard/lookups/lookupValueAdd/hooks/useValueAdd';

const ValueAddTranslationTable = () => {
  const { cellState, columns } = useValueAdd();
  const [data, setData] = cellState;

  return (
    <>
      <FilteringTable
        {...{
          columns,
          data,
          editable: {
            setData: setData,
            cellComponent: ValueAddTranslationCell
          },
          canExpand: true,
          options: {
            expanded: true
          },
          renderSubRows: (row) => <ValueAddTranslationSubTable data={row.original} />,
          headerAdditions: [<ValueAddTranslationHeader key="lookup-add-value-header" />]
        }}
      />
    </>
  );
};

export default ValueAddTranslationTable;
