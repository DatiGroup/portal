import type { TextFieldProps } from '@mui/material/TextField';
import type { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import type { MobileDateTimePickerProps } from '@mui/x-date-pickers/MobileDateTimePicker';

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Controller, useFormContext } from 'react-hook-form';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

import { TimePicker, type TimePickerProps } from '@mui/x-date-pickers';
import React from 'react';
import type { PickerValue } from '@mui/x-date-pickers/internals';
import { formatDate, isValidDate } from 'utils/dateUtils';
import { HelperText } from './help-text';
import { RHFInputWrapper } from './rhf-text-field';

// ----------------------------------------------------------------------

type RHFDatePickerProps = DatePickerProps & {
  name: string;
  size?: 'small' | 'medium';
};

export function RHFDatePicker({ name, size, slotProps, ...other }: RHFDatePickerProps) {
  const { control, setValue, trigger } = useFormContext();
  const { t } = useTranslation();

  const setDate = (value: any, onChange: (value: any) => void) => {
    const valid = isValidDate(value);
    if (valid) {
      setValue(name, dayjs(value).format());
      trigger(name);
      //onChange(dayjs(value).format())
    } else {
      onChange(null);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <RHFInputWrapper>
          <DatePicker
            {...field}
            value={dayjs(field.value)}
            onChange={(newValue) => setDate(newValue, field.onChange)}
            //onChange={(newValue) => field.onChange(dayjs(newValue).format())}
            format={formatDate.split.date}
            slotProps={{
              ...slotProps,
              textField: {
                size,
                error: !!error,
                helperText: error?.message ? t(error?.message, error?.message) : (slotProps?.textField as TextFieldProps)?.helperText,
                ...slotProps?.textField
              }
            }}
            {...other}
          />
        </RHFInputWrapper>
      )}
    />
  );
}

// ----------------------------------------------------------------------

type RHFMobileDateTimePickerProps = MobileDateTimePickerProps & {
  name: string;
};

export function RHFMobileDateTimePicker({ name, slotProps, ...other }: RHFMobileDateTimePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <RHFInputWrapper>
          <MobileDateTimePicker
            {...field}
            value={dayjs(field.value)}
            onChange={(newValue) => field.onChange(dayjs(newValue).format())}
            format={formatDate.split.dateTime}
            slotProps={{
              textField: {
                fullWidth: true,
                InputProps: {
                  sx: { height: '3rem' },
                  ...(slotProps?.textField as any)?.InputProps
                },
                InputLabelProps: {
                  shrink: true,
                  sx: { backgroundColor: 'transparent' },
                  ...(slotProps?.textField as any)?.InputLabelProps
                }
              }
            }}
            {...other}
          />

          <HelperText data-testid={`${name}-helperText`} errorMessage={error?.message} />
        </RHFInputWrapper>
      )}
    />
  );
}

type RHFTimePickerProps = TimePickerProps & { name: string };

export function RHFTimePicker({ name, slotProps, ...other }: RHFTimePickerProps) {
  const { control, setValue, getValues } = useFormContext();
  const initTime = getValues(name);
  const [dateTime, setDateTime] = React.useState<Dayjs | null>(dayjs(initTime, 'HH:mm'));

  const setDate = (value: PickerValue, onChange: (value?: string) => void) => {
    const valid = isValidDate(value);
    if (valid) {
      setValue(name, dayjs(value).format(formatDate.time), { shouldDirty: true, shouldTouch: true, shouldValidate: true });
      setDateTime(value);
    } else {
      onChange('');
    }
  };

  const { t } = useTranslation();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <RHFInputWrapper>
          <TimePicker
            {...field}
            value={dateTime}
            onChange={(newValue) => setDate(newValue, field.onChange)}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!error,
                helperText: error?.message ? t(error.message, error.message) : (slotProps?.textField as TextFieldProps)?.helperText,
                ...slotProps?.textField
              },
              ...slotProps
            }}
            {...other}
          />
        </RHFInputWrapper>
      )}
    />
  );
}
