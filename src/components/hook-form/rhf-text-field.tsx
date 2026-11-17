import type { TextFieldProps } from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import { transformValueOnBlur, transformValueOnChange } from 'utils/transformUtils';
import { HelperText } from 'components/hook-form/help-text';
import { Box, FormControl, styled } from '@mui/material';

export type RHFTextFieldProps = TextFieldProps & {
  name: string;
};

export const RHFInputWrapper = styled(Box)(() => ({
  width: '100%'
}));

export function RHFTextField({ name, helperText, slotProps, type = 'text', ...other }: RHFTextFieldProps) {
  const { control } = useFormContext();
  const isNumberType = type === 'number';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <RHFInputWrapper>
          <TextField
            {...field}
            fullWidth
            value={isNumberType ? `${field.value}` : field.value}
            onChange={(event) => {
              const transformedValue = isNumberType ? transformValueOnChange(event.target.value) : event.target.value;
              field.onChange(transformedValue);
            }}
            onBlur={(event) => {
              const transformedValue = isNumberType ? transformValueOnBlur(event.target.value) : event.target.value;

              field.onChange(transformedValue);
            }}
            type={isNumberType ? 'text' : type}
            error={!!error}
            slotProps={{
              inputLabel: {
                shrink: true,
                style: { backgroundColor: 'transparent' },
                ...slotProps?.inputLabel
              },
              input: {
                sx: { height: '3rem' },
                ...slotProps?.input
              },
              htmlInput: {
                autoComplete: 'off',
                ...(isNumberType && { inputMode: 'decimal', pattern: '[0-9]*\\.?[0-9]*' }),
                ...slotProps?.htmlInput
              }
            }}
            {...other}
          />
          <HelperText data-testid={`${name}-helperText`} errorMessage={error?.message} helperText={helperText} />
        </RHFInputWrapper>
      )}
    />
  );
}
