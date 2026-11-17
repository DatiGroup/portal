import { ColumnDef } from '@tanstack/react-table';
import { LangCodes } from 'config';
import { TFunction } from 'i18next';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import zod from 'zod';

export const LookupValueSchema = (t: TFunction) => {
  const shape: Record<string, any> = {
    lookupCode: zod.string().max(30, { message: t('validator.max', { max: 30 }) }),
    enabled: zod.boolean(),
    startDateActive: zod.iso.datetime(t('validator.isoDateTime')),
    endDateActive: zod.iso.datetime(t('validator.isoDateTime')).optional().nullable()
  };

  Object.keys(LangCodes).forEach((langCode) => {
    shape[`meaning_${langCode}`] = zod.string().nonempty(t('validator.required'));
    shape[`description_${langCode}`] = zod.string().nonempty(t('validator.required'));
  });

  return zod.object(shape);
};

export type LookupValueSchemaType = zod.infer<ReturnType<typeof LookupValueSchema>>;

export const PrimaryTranslationSchema = zod.object({
  primaryMeaning: zod.string().nonempty(),
  primaryDescription: zod.string().nonempty()
});

export interface LookupValueAddContextProps {
  children: ReactNode | ReactNode[];
}

export interface InputGridProps {
  children: ReactNode | ReactNode[];
  down475?: boolean;
}

export interface RowContent {
  id?: any;
  languageCode: keyof typeof LangCodes;
  languageName: LangCodes;
  meaning: string;
  description: string;
}

export interface LookupValueAddHookReturnType {
  cellState: [RowContent[], Dispatch<SetStateAction<RowContent[]>>];
  columns: ColumnDef<RowContent>[];
}

export interface LookupValueAddContextType {
  valueState: [any, Dispatch<SetStateAction<any>>] | null;
  errorMessage: string | null;
  isSubmitting: boolean;
  isTranslating: boolean;
  handleInput: (event: any) => void;
  handleAutoTranslate: () => void;
  methods: any;
  onSubmit: () => void;
  allowAutoTl: boolean;
  lookupType: string | null;
}
