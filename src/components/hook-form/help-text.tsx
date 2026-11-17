import type { FormHelperTextProps } from '@mui/material/FormHelperText';

import FormHelperText from '@mui/material/FormHelperText';

// ----------------------------------------------------------------------

export type HelperTextProps = FormHelperTextProps & {
  errorMessage?: string;
  disableGutters?: boolean;
  helperText?: React.ReactNode;
};

export function HelperText({ sx, helperText, errorMessage, disableGutters, ...other }: HelperTextProps) {
  return (
    <FormHelperText
      error={!!errorMessage}
      sx={[
        {
          mx: disableGutters ? 0 : 1.75
        },
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
      {...other}
    >
      {errorMessage || helperText}
    </FormHelperText>
  );
}
