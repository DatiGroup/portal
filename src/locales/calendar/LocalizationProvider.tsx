//date format locales
import 'dayjs/locale/en';
import 'dayjs/locale/ru';

import dayjs from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider as Provider } from '@mui/x-date-pickers/LocalizationProvider';
import { useCalendarLocale } from './useCalendarLocale';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function LocalizationProvider({ children }: Props) {
  const { calendarLang } = useCalendarLocale();

  dayjs.locale(calendarLang.locale);

  return (
    <Provider dateAdapter={AdapterDayjs} adapterLocale={calendarLang.locale} localeText={calendarLang.localeText}>
      {children}
    </Provider>
  );
}
