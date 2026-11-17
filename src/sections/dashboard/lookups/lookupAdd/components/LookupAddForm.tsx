import { useContext } from 'react';
import { Form } from 'components/hook-form';
import { Grid } from '@mui/material';
import { LookupAddContext } from 'sections/dashboard/lookups/lookupAdd/context/LookupAddContextProvider';
import LookupAddTranslationTable from 'sections/dashboard/lookups/lookupAdd/components/LookupAddTranslationTable';
import { LookupAddContextType } from 'sections/dashboard/lookups/lookupAdd/types/lookupAddTypes';

const LookupAddForm = () => {
  const { methods, onSubmit } = useContext<LookupAddContextType>(LookupAddContext);

  return (
    <Form aria-label="lookupValueAddForm" methods={methods} onSubmit={onSubmit} autoSubmit>
      <Grid container spacing={3}>
        <Grid size={12}>
          <LookupAddTranslationTable />
        </Grid>
      </Grid>
    </Form>
  );
};

export default LookupAddForm;
