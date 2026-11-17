import { LangCodes } from 'config';
import { LookupCode, TlType } from 'store/slices/lookup/types';
import { LookupValueSchemaType } from 'sections/dashboard/lookups/lookupValueAdd/types/valueAddTypes';

export const getSecondaryLanguages = (primary: keyof typeof LangCodes) => {
  const allLanguages = Object.keys(LangCodes) as (keyof typeof LangCodes)[];
  const primaryIndex = allLanguages.indexOf(primary);

  allLanguages.splice(primaryIndex, 1);
  return allLanguages;
};

export const handleLookupValueInputParse = (valueInput: LookupValueSchemaType): LookupCode => {
  const { lookupCode, enabled, startDateActive, endDateActive, ...translations } = valueInput;
  const langCodes = Object.keys(LangCodes);
  const translationDTO: TlType[] = langCodes.map((langCode: string) => ({
    languageCode: langCode,
    translation: {
      meaning: translations[`meaning_${langCode}`] as string,
      description: translations[`description_${langCode}`] as string
    }
  }));

  const lookupCodeValue: string | undefined = (lookupCode as string) === '' ? undefined : (lookupCode as string);
  const endDateActiveValue: string | undefined = (endDateActive as string | null) === null ? undefined : (endDateActive as string);

  const lookupValueDTO = {
    lookupCode: lookupCodeValue,
    enabled: enabled as boolean,
    startDateActive: startDateActive as string,
    endDateActive: endDateActiveValue,
    tl: translationDTO
  };

  return lookupValueDTO;
};

export const formatLookupValueCode = (code: string) => {
  // return code.trim().toUpperCase();
  return code.trim();
};
