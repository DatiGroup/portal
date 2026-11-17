import { LangCodes } from 'config';

export interface GoogleTranslateParams {
  q: string | string[];
  source: keyof typeof LangCodes;
  target: keyof typeof LangCodes;
  format?: 'text' | 'html';
}

export interface GoogleTranslateDTO {
  source: keyof typeof LangCodes;
  target: keyof typeof LangCodes;
  translations: Array<{
    translatedText: string;
  }>;
}
