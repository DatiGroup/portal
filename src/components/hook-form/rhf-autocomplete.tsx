import type { TextFieldProps } from '@mui/material/TextField';
import type { AutocompleteProps, AutocompleteRenderInputParams } from '@mui/material/Autocomplete';

import { useTranslation } from 'react-i18next';
import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// ----------------------------------------------------------------------

export type AutocompleteBaseProps = Omit<AutocompleteProps<any, boolean, boolean, boolean>, 'renderInput'>;

export type RHFAutocompleteProps = AutocompleteBaseProps & {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
  slotProps?: AutocompleteBaseProps['slotProps'] & {
    textfield?: TextFieldProps;
  };
};

export function RHFAutocomplete({
  name,
  label,
  slotProps,
  helperText,
  placeholder,
  renderInput,
  onChange,
  ...other
}: RHFAutocompleteProps) {
  const { control, setValue } = useFormContext();
  const { t } = useTranslation();
  const { textfield, ...otherSlotProps } = slotProps ?? {};

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          id={`rhf-autocomplete-${name}`}
          loadingText={t('alerts.loading')}
          onChange={(event, newValue, reason) => {
            setValue(name, newValue, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
            onChange && onChange(event, newValue, reason);
          }}
          sx={(theme) => ({
            '& .MuiInputBase-root': {
              height: '3rem',
              borderRadius: '4px'
            }
          })}
          renderInput={
            renderInput
              ? renderInput
              : (params) => (
                  <TextField
                    name={name}
                    {...params}
                    {...textfield}
                    label={label}
                    placeholder={placeholder}
                    error={!!error}
                    helperText={error?.message ? t(error.message, error.message) : helperText}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                        style: { backgroundColor: 'transparent' }
                      },
                      ...textfield?.slotProps,
                      htmlInput: {
                        ...params.inputProps,
                        autoComplete: 'new-password',
                        ...textfield?.slotProps?.htmlInput
                      }
                    }}
                  />
                )
          }
          {...other}
          slotProps={otherSlotProps}
        />
      )}
    />
  );
}
