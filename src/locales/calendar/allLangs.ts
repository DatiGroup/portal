import { deDE, ruRU } from '@mui/x-date-pickers/locales';

import { lvLV } from './extendedCalendarLocales/lvLV';
//available options for translations
// https://mui.com/x/react-date-pickers/localization/#supported-locales
// ----------------------------------------------------------------------

export const allLangs = [
  {
    locale: 'en',
    localeText: undefined,
    numberFormat: { code: 'en-US', currency: 'USD' }
  },
  {
    locale: 'de',
    localeText: deDE.components.MuiLocalizationProvider.defaultProps.localeText,
    numberFormat: { code: 'de-DE', currency: 'EUR' }
  },
  {
    locale: 'lv',
    localeText: lvLV.components.MuiLocalizationProvider.defaultProps.localeText,
    numberFormat: { code: 'lv-LV', currency: 'EUR' }
  },
  {
    locale: 'ru',
    localeText: ruRU.components.MuiLocalizationProvider.defaultProps.localeText,
    numberFormat: { code: 'ru-RU', currency: 'RUB' }
  }
];
