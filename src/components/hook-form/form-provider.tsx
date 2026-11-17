import type { UseFormReturn } from 'react-hook-form';

import { FormProvider as RHFForm } from 'react-hook-form';

// ----------------------------------------------------------------------

// export type FormProps = {
//   onSubmit?: () => void;
//   children: React.ReactNode;
//   methods: UseFormReturn<any>;
//   style?: React.CSSProperties;
//   autoSubmit?: boolean;

// };

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit?: () => void;
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  style?: React.CSSProperties;
  autoSubmit?: boolean;
}

export function Form({ children, autoSubmit, onSubmit, methods, style, ...other }: FormProps) {
  return (
    <RHFForm {...methods}>
      <form
        onSubmit={onSubmit}
        noValidate
        autoComplete="off"
        style={style}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !autoSubmit) e.preventDefault();
        }}
        {...other}
      >
        {children}
      </form>
    </RHFForm>
  );
}
