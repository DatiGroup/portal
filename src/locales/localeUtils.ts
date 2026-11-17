import { LANG_LOCAL_STORAGE_KEY } from './constants';
import i18n from './i18n';

export const setLocalLang = (lang: string) => localStorage.setItem(LANG_LOCAL_STORAGE_KEY, lang);
export const getLang = () => localStorage.getItem(LANG_LOCAL_STORAGE_KEY) ?? i18n.resolvedLanguage ?? 'en';
