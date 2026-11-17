import FilteringTable from 'components/tables/filteringTable/FilteringTable';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';
import { AdminActivityType } from 'store/slices/platformUsers/platformUserTypes';
import useCustomBreakpoints from 'hooks/useCustomBreakpoints';
import { columnsMobile } from './columnsMobile';
import { columnsDesktop } from './columnsDesktop';

interface Props {
  data: AdminActivityType[];
}
const AdminActivityLogTable = ({ data }: Props) => {
  const { t } = useTranslation();
  const { isMobile } = useCustomBreakpoints();
  const columns = useMemo(() => (isMobile ? columnsMobile({ t }) : columnsDesktop({ t })), [isMobile, t]);

  return (
    <Stack rowGap={2}>
      <Accordion>
        <AccordionSummary>
          <Typography variant="h5">{t('accessManagementLog')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilteringTable
            {...{
              data: data || [],
              columns,
              options: {
                enablePagination: true
              }
            }}
          />
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default AdminActivityLogTable;
