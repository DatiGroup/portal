import { useContext, useEffect, useMemo, useState } from 'react';
import { getSecondaryLanguages } from 'sections/dashboard/lookups/lookupValueAdd/utils/valueAddUtils';
import { LangCodes } from 'config';
import { useTranslation } from 'react-i18next';
import { ValueAddContext } from 'sections/dashboard/lookups/lookupValueAdd/context/ValueAddContextProvider';
import {
  LookupValueAddContextType,
  LookupValueAddHookReturnType,
  RowContent
} from 'sections/dashboard/lookups/lookupValueAdd/types/valueAddTypes';
import { ColumnDef } from '@tanstack/react-table';

const useValueAddSub = (): LookupValueAddHookReturnType => {
  const { t, i18n } = useTranslation();
  const { language: currentLang } = i18n;
  const [data, setData] = useState<RowContent[]>([]);

  const { valueState } = useContext<LookupValueAddContextType>(ValueAddContext);
  const [valueInput] = valueState!;

  const columns = useMemo<ColumnDef<RowContent>[]>(
    () => [
      {
        header: t('lookupValueAdd.languageName'),
        accessorKey: 'languageName',
        meta: {
          className: 'cell-left'
        }
      },
      {
        header: t('lookupValueAdd.meaning'),
        accessorKey: 'meaning',
        dataType: 'text',
        meta: {
          className: 'cell-left'
        }
      },
      {
        header: t('lookupValueAdd.description'),
        accessorKey: 'description',
        dataType: 'text',
        meta: {
          className: 'cell-left'
        }
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    setData((prevState) => {
      const secondaryTranslations = getSecondaryLanguages(currentLang as keyof typeof LangCodes);
      const secondaryTranslationsDTO = secondaryTranslations.map((langCode) => ({
        languageCode: langCode,
        languageName: LangCodes[langCode as keyof typeof LangCodes],
        meaning: valueInput[`meaning_${langCode}`],
        description: valueInput[`description_${langCode}`]
      }));

      return secondaryTranslationsDTO || [];
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLang]);

  return { cellState: [data, setData], columns };
};

export default useValueAddSub;
