import { useTranslation } from 'react-i18next';

import { allLangs } from './allLangs';

export function useCalendarLocale() {
  const { i18n } = useTranslation();
  const defaultLanguage = allLangs.filter((lang) => lang.locale === 'en')[0];
  const currentLang = allLangs.find((lang) => lang.locale === i18n.resolvedLanguage);

  return {
    calendarLang: currentLang ?? defaultLanguage
  };
}
