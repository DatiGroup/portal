import type { TextFieldProps } from '@mui/material/TextField';
import { Field } from './fields';
import { useTranslation } from 'react-i18next';
import { IconButton, InputAdornment } from '@mui/material';
import { Iconify } from '../Iconify';
import { useState } from 'react';

export type RHFPasswordFieldProps = TextFieldProps & {
  name?: string;
  label?: string;
  placeholder?: string;
};

export function RHFPassword({ name, label, placeholder, ...rest }: RHFPasswordFieldProps) {
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field.Text
      name={name ?? 'password'}
      label={label ?? t('password')}
      placeholder={placeholder}
      type={showPassword ? 'text' : 'password'}
      slotProps={{
        inputLabel: { shrink: true },
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword((prevState) => !prevState)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          )
        }
      }}
      {...rest}
    />
  );
}
