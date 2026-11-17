import { FormControl, InputLabel, Theme } from '@mui/material';
import Select, { SelectProps } from '@mui/material/Select';
import { Controller, useFormContext } from 'react-hook-form';
import { HelperText } from 'components/hook-form/help-text';
import { RHFInputWrapper } from './rhf-text-field';

export type RHFSelectProps = {
  name: string;
  helperText?: string;
} & SelectProps & { children?: React.ReactNode };

export function RHFSelect({ name, helperText, slotProps, label, disabled, children, ...rest }: RHFSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <RHFInputWrapper>
          <FormControl fullWidth>
            <InputLabel
              disabled={disabled}
              id={`${name}-label`}
              htmlFor={`${name}-select`}
              shrink={true}
              sx={{
                '&.MuiInputLabel-shrink': {
                  color: (theme: Theme) => theme.palette.text.primary,
                  backgroundColor: 'transparent'
                }
              }}
            >
              {label}
            </InputLabel>
            <Select
              {...field}
              disabled={disabled}
              id={`${name}-select`}
              labelId={`${name}-label`}
              error={!!error}
              value={field.value}
              onChange={(event) => field.onChange(event.target.value)}
              onBlur={(event) => field.onChange(event.target.value)}
              sx={{ height: '3rem' }}
              slotProps={{
                input: {
                  ...slotProps?.input
                }
              }}
              {...rest}
            >
              {children}
            </Select>

            <HelperText data-testid={`${name}-helperSelect`} errorMessage={error?.message} helperText={helperText} />
          </FormControl>
        </RHFInputWrapper>
      )}
    />
  );
}
