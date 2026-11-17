import { Box, Button, FormHelperText, Grid, InputAdornment, MenuItem, Typography } from '@mui/material';
import { Field } from 'components/hook-form/fields';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import FieldStringOutlined from '@ant-design/icons/FieldStringOutlined';
import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined';
import AlipayOutlined from '@ant-design/icons/AlipayOutlined';
import { LookupAddContext } from 'sections/dashboard/lookups/lookupAdd/context/LookupAddContextProvider';
import { LookupAddContextType } from 'sections/dashboard/lookups/lookupAdd/types/lookupAddTypes';
import { InputGrid } from 'sections/dashboard/lookups/lookupValueAdd/components/ValueAddTranslationHeader';
import { FndTypeEnum } from 'types/fndTypes';

const LookupAddTranslationHeader = () => {
  const { t } = useTranslation();

  const { valueState, handleInput, handleAutoTranslate, allowAutoTl, methods, errorMessage, isSubmitting, isTranslating } =
    useContext<LookupAddContextType>(LookupAddContext);
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
                name="lookupType"
                label={t('lookupAdd.type')}
                placeholder="CUSTOM_VALUE"
                value={valueInput.lookupType}
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
              <Field.Select
                inputProps={{ id: 'purpose' }}
                displayEmpty
                name="purpose"
                value={valueInput.purpose}
                onChange={(e) => handleInput(e)}
              >
                <MenuItem value="">{t('lookupValueAdd.purpose')}</MenuItem>
                {Object.values(FndTypeEnum).map((type: string) => (
                  <MenuItem value={type}>{type}</MenuItem>
                ))}
              </Field.Select>
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
            {t('lookupAdd.addNewLookup')}
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

export default LookupAddTranslationHeader;
