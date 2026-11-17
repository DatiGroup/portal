import { Box, Button, FormHelperText, Grid, InputAdornment, Typography, useMediaQuery } from '@mui/material';
import { InputGridProps, LookupValueAddContextType } from 'sections/dashboard/lookups/lookupValueAdd/types/valueAddTypes';
import { Field } from 'components/hook-form/fields';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ValueAddContext } from 'sections/dashboard/lookups/lookupValueAdd/context/ValueAddContextProvider';
import FieldStringOutlined from '@ant-design/icons/FieldStringOutlined';
import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined';
import AlipayOutlined from '@ant-design/icons/AlipayOutlined';

export const InputGrid = ({ children }: InputGridProps) => {
  const down475 = useMediaQuery('(max-width: 475px)');

  return <Grid size={down475 ? 12 : { xs: 6, sm: 4, md: 3 }}>{children}</Grid>;
};

const ValueAddTranslationHeader = () => {
  const { t } = useTranslation();

  const { valueState, handleInput, handleAutoTranslate, allowAutoTl, methods, errorMessage, isSubmitting, isTranslating } =
    useContext<LookupValueAddContextType>(ValueAddContext);
  const [valueInput] = valueState!;

  return (
    <Box key="lookupValueAddHeader" sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column-reverse',
          flexWrap: 'wrap',
          gap: 2
        }}
      >
        <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', gap: 1, flexGrow: 2 }}>
          <Grid sx={{ justifyContent: 'flex-start' }} spacing={2} container size={12}>
            <InputGrid>
              <Field.Text
                name="lookupCode"
                label={t('lookupValueAdd.valueCode')}
                placeholder="CUSTOM_VALUE"
                value={valueInput.lookupCode}
                onChange={(e) => handleInput(e)}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment sx={{ fontSize: 24 }} position="end">
                        <FieldStringOutlined />
                      </InputAdornment>
                    )
                  }
                }}
              />
            </InputGrid>
            <InputGrid>
              <Field.MobileDateTimePicker
                name="startDateActive"
                label={`${t('lookupValueAdd.startDate')} *`}
                value={valueInput.startDateActive ? dayjs(valueInput.startDateActive) : null}
                onChange={(date) => {
                  const startDate = date ? dayjs(date).toISOString() : undefined;

                  methods.setValue('startDateActive', startDate, {
                    shouldValidate: true,
                    shouldDirty: true
                  });
                  handleInput({ target: { name: 'startDateActive', value: startDate } });
                }}
              />
            </InputGrid>
            <InputGrid>
              <Field.MobileDateTimePicker
                name="endDateActive"
                label={t('lookupValueAdd.endDate')}
                value={valueInput.endDateActive ? dayjs(valueInput.endDateActive) : null}
                onChange={(date) => {
                  const endDate = date ? dayjs(date).toISOString() : null;

                  methods.setValue('endDateActive', endDate, {
                    shouldValidate: true,
                    shouldDirty: true
                  });
                  handleInput({ target: { name: 'endDateActive', value: endDate } });
                }}
              />
            </InputGrid>
            <InputGrid>
              <Field.Checkbox
                name="enabled"
                label={<Typography variant="body1">{t('lookupValueAdd.enable')}</Typography>}
                slotProps={{
                  checkbox: {
                    checked: valueInput.enabled,
                    onChange: (e) => handleInput(e),
                    className: 'size-large'
                  }
                }}
              />
            </InputGrid>
          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5
          }}
        >
          <Button
            name="submitButton"
            type="submit"
            variant="contained"
            aria-label="submitButton"
            startIcon={<PlusCircleOutlined />}
            sx={{ width: 'fit-content' }}
            loading={isSubmitting}
          >
            {t('lookupValueAdd.addNewValue')}
          </Button>
          <Grid size={12}>
            <FormHelperText sx={{ minHeight: '24px' }} error>
              {errorMessage}
            </FormHelperText>
          </Grid>
        </Box>
      </Box>
      <Box>
        <Button
          disabled={!allowAutoTl}
          loading={isTranslating}
          name="autoTranslateButton"
          key="lookup-add-value-auto-translate"
          variant="contained"
          startIcon={<AlipayOutlined />}
          onClick={() => handleAutoTranslate()}
        >
          {t('lookupValueAdd.autoTranslate')}
        </Button>
      </Box>
    </Box>
  );
};

export default ValueAddTranslationHeader;
