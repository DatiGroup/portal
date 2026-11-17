import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './translations/en.json';
import lvTranslation from './translations/lv.json';
import LanguageDetector from 'i18next-browser-languagedetector';
import { LANG_LOCAL_STORAGE_KEY } from './constants';

// Import brand-specific translations
const importBrandTranslations = async (lang: string) => {
  try {
    // Use import.meta.env.VITE_BRAND or derive from config
    const brand = import.meta.env.VITE_BRAND || '';
    if (!brand) {
      return {};
    }
    const brandTranslation = await import(`../brands/${brand}/translations/${lang}.json`);
    return brandTranslation.default || brandTranslation;
  } catch (error) {
    console.warn(`Brand translation not found for language: ${lang}`);
    return {};
  }
};

const storedValue = localStorage.getItem(LANG_LOCAL_STORAGE_KEY);
const defaultLanguage = storedValue ?? 'en';

// Merge translations dynamically
const initI18n = async () => {
  const enBrand = await importBrandTranslations('en');
  const lvBrand = await importBrandTranslations('lv');

  i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(
      {
        react: {
          useSuspense: false
        },
        fallbackLng: defaultLanguage,
        lng: defaultLanguage,
        debug: false,
        partialBundledLanguages: true, //load from api and project transatlions
        ns: ['frontend'],
        defaultNS: 'frontend',
        interpolation: {
          escapeValue: false
        },
        resources: {
          en: { frontend: { ...enTranslation, ...enBrand } },
          lv: { frontend: { ...lvTranslation, ...lvBrand } }
        }
      },
      (err, t) => {
        if (err) {
          console.error('i18n initialization error:', err);
        }
      }
    );
};

initI18n();

export default i18next;
