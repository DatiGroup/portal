import { LookupType, TlType } from 'store/slices/lookup/types';
import { LookupSchemaType } from 'sections/dashboard/lookups/lookupAdd/types/lookupAddTypes';
import { LangCodes } from 'config';
import { FndTypeEnum } from 'types/fndTypes';

export const handleLookupInputParse = (valueInput: LookupSchemaType): LookupType => {
  const { lookupType, enabled, startDateActive, endDateActive, purpose, ...translations } = valueInput;
  const langCodes = Object.keys(LangCodes);
  const translationDTO: TlType[] = langCodes.map((langCode: string) => ({
    languageCode: langCode,
    translation: {
      meaning: translations[`meaning_${langCode}`] as string,
      description: translations[`description_${langCode}`] as string
    }
  }));

  const lookupTypeValue: string | undefined = (lookupType as string) === '' ? undefined : (lookupType as string);
  const endDateActiveValue: string | undefined = (endDateActive as string | null) === null ? undefined : (endDateActive as string);

  const lookupDTO = {
    lookupType: lookupTypeValue,
    enabled: enabled as boolean,
    startDateActive: startDateActive as string,
    endDateActive: endDateActiveValue,
    tl: translationDTO,
    purpose: purpose as FndTypeEnum
  };

  return lookupDTO;
};
