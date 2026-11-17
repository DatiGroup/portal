import FilteringTable from 'components/tables/filteringTable/FilteringTable';
import LookupHeaderButton from 'sections/dashboard/lookups/components/LookupHeaderButton';
import useLookups from 'sections/dashboard/lookups/hooks/useLookups';
import { useTranslation } from 'react-i18next';

export default function LookupsView() {
  const { t } = useTranslation();
  const { data, columns } = useLookups();

  return (
    <>
      <FilteringTable
        {...{
          data,
          columns,
          headerAdditions: [<LookupHeaderButton key="lookup-add-button">{t('lookups.addLookup')}</LookupHeaderButton>],
          options: {
            enablePagination: true,
            enableGlobalFilter: true,
            enableGlobalSort: true,
            enableColumnSort: true
          }
        }}
      />
    </>
  );
}
