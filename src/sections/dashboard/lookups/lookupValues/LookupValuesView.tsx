import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import FilteringTable from 'components/tables/filteringTable/FilteringTable';
import { useTranslation } from 'react-i18next';
import LookupHeaderButton from 'sections/dashboard/lookups/components/LookupHeaderButton';
import useLookupValues from 'sections/dashboard/lookups/lookupValues/hooks/useLookupValues';

const ContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2)
}));

const LookupValuesView = () => {
  const { t } = useTranslation();
  const { data, columns, valueTranslation } = useLookupValues();

  return (
    <ContentContainer>
      <FilteringTable
        {...{
          data,
          columns,
          headerAdditions: [
            <LookupHeaderButton key="lookup-value-add-button" to={'lookup-value-add'}>
              {t('lookupValues.add', { type: valueTranslation?.meaning?.toLowerCase() })}
            </LookupHeaderButton>
          ],
          options: {
            enableGlobalSort: true,
            enableColumnSort: true,
            enableGlobalFilter: true,
            enablePagination: true
          }
        }}
      />
    </ContentContainer>
  );
};

export default LookupValuesView;
