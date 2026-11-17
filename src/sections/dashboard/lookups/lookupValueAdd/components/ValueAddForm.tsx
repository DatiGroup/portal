import { useContext } from 'react';
import { ValueAddContext } from 'sections/dashboard/lookups/lookupValueAdd/context/ValueAddContextProvider';
import { Form } from 'components/hook-form';
import { Grid } from '@mui/material';
import ValueAddTranslationTable from 'sections/dashboard/lookups/lookupValueAdd/components/ValueAddTranslationTable';
import { LookupValueAddContextType } from 'sections/dashboard/lookups/lookupValueAdd/types/valueAddTypes';

const ValueAddForm = () => {
  const { methods, onSubmit } = useContext<LookupValueAddContextType>(ValueAddContext);

  return (
    <Form aria-label="lookupValueAddForm" methods={methods} onSubmit={onSubmit} autoSubmit>
      <Grid container spacing={3}>
        <Grid size={12}>
          <ValueAddTranslationTable />
        </Grid>
      </Grid>
    </Form>
  );
};

export default ValueAddForm;
