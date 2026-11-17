import DownOutlined from '@ant-design/icons/DownOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import StopOutlined from '@ant-design/icons/StopOutlined';
import IconButton from 'components/@extended/IconButton';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnDef, Row } from '@tanstack/react-table';
import { LangCodes } from 'config';
import { LookupAddContext } from 'sections/dashboard/lookups/lookupAdd/context/LookupAddContextProvider';
import { LookupAddContextType, LookupAddHookReturnType, RowContent } from 'sections/dashboard/lookups/lookupAdd/types/lookupAddTypes';

const useLookupAdd = (): LookupAddHookReturnType => {
  const { t, i18n } = useTranslation();
  const { language: currentLang } = i18n;
  const [data, setData] = useState<RowContent[]>([]);

  const { valueState } = useContext<LookupAddContextType>(LookupAddContext);
  const [valueInput] = valueState!;

  const columns = useMemo<ColumnDef<RowContent>[]>(
    () => [
      {
        id: 'expander',
        header: () => null,
        cell: ({ row }: { row: Row<RowContent> }) => {
          return row.getCanExpand() ? (
            <IconButton color={row.getIsExpanded() ? 'primary' : 'secondary'} onClick={row.getToggleExpandedHandler()} size="small">
              {row.getIsExpanded() ? <DownOutlined /> : <RightOutlined />}
            </IconButton>
          ) : (
            <IconButton color="secondary" size="small" disabled>
              <StopOutlined />
            </IconButton>
          );
        },
        meta: {
          className: 'cell-center'
        }
      },
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
    [t]
  );

  useEffect(() => {
    setData(() => {
      const primaryTranslation = [
        {
          languageCode: currentLang as RowContent['languageCode'],
          languageName: LangCodes[currentLang as keyof typeof LangCodes],
          meaning: valueInput[`meaning_${currentLang}`] as string,
          description: valueInput[`description_${currentLang}`] as string
        }
      ];

      return primaryTranslation;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLang]);

  return { cellState: [data, setData], columns };
};

export default useLookupAdd;
