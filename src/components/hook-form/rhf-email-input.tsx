import { useTranslation } from 'react-i18next';

import { Field } from './fields';
import { InputAdornment, TextFieldProps } from '@mui/material';
import { Iconify } from 'components/Iconify';

export type RHFEmailFieldProps = TextFieldProps & {
  name?: string;
  label?: string;
  placeholder?: string;
};

export function RHFEmailInput({ name, label, placeholder, ...rest }: RHFEmailFieldProps) {
  const { t } = useTranslation();
  return (
    <Field.Text
      name={name ?? 'email'}
      label={label ?? t('email')}
      placeholder={placeholder}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start" sx={{ mr: 0 }}>
              <Iconify icon="mdi:email-outline" />
            </InputAdornment>
          )
        }
      }}
      {...rest}
    />
  );
}
