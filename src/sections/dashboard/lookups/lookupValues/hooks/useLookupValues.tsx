import Chip from '@mui/material/Chip';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useGetLookupValuesQuery } from 'store/slices/lookup/lookupSlice';
import { LookupCode, TranslationType } from 'store/slices/lookup/types';
import { EditableEnum, EnabledEnum, LookupValuesTable } from 'types/tableTypes';
import { formatDate, formatDateString } from 'utils/dateUtils';
import { fuzzySort } from 'utils/sortings';

interface UseLookupValuesViewReturn {
  data: LookupValuesTable[];
  columns: ColumnDef<LookupValuesTable>[];
  valueTranslation: TranslationType | undefined;
}

const useLookupValues = (): UseLookupValuesViewReturn => {
  const { type } = useParams();
  const { t, i18n } = useTranslation();
  const { language: currentLang } = i18n;
  const { data: apiData } = useGetLookupValuesQuery(type as string);

  const valueTranslation = apiData?.tl?.find((tl) => tl.languageCode === currentLang)?.translation;

  const data: LookupValuesTable[] = useMemo(
    () =>
      apiData?.lookupCodes?.map((code: LookupCode) => {
        const codeTranslation = code.tl?.find((tl) => tl.languageCode === currentLang)?.translation;

        return {
          lookupCode: code.lookupCode,
          meaning: codeTranslation?.meaning || '',
          description: codeTranslation?.description || '',
          enabled: code.enabled ? EnabledEnum.enabled : EnabledEnum.disabled,
          editable: code.editable ? EditableEnum.editable : EditableEnum.constant,
          // startDateActive: formatDateString(code.startDateActive, formatDate.paramCase.dateTime),
          // endDateActive: formatDateString(code.endDateActive, formatDate.paramCase.dateTime)
          startDateActive: code.startDateActive,
          endDateActive: code.endDateActive
        };
      }) || [],
    [apiData, currentLang]
  );

  const columns = useMemo<ColumnDef<LookupValuesTable>[]>(
    () => [
      {
        header: t('lookups.values.lookupCode'),
        accessorKey: 'lookupCode',
        sortingFn: fuzzySort,
        meta: {
          className: 'cell-center'
        }
      },
      {
        header: t('lookups.values.meaning'),
        accessorKey: 'meaning',
        sortingFn: fuzzySort,
        meta: {
          className: 'cell-center'
        }
      },
      {
        header: t('lookups.values.description'),
        accessorKey: 'description',
        meta: {
          className: 'cell-center'
        }
      },
      {
        header: t('lookups.values.enabled'),
        accessorKey: 'enabled',
        meta: {
          className: 'cell-center'
        },
        cell: (props) => {
          switch (props.getValue()) {
            case EnabledEnum.enabled:
              return <Chip color="success" label={t('lookups.values.enabled')} size="small" variant="light" />;
            case EnabledEnum.disabled:
              return <Chip color="error" label={t('lookups.values.disabled')} size="small" variant="light" />;
          }
        }
      },
      {
        header: t('lookups.values.editable'),
        accessorKey: 'editable',
        sortingFn: fuzzySort,
        meta: {
          className: 'cell-center'
        },
        cell: (props) => {
          switch (props.getValue()) {
            case EditableEnum.editable:
              return <Chip color="info" label={t('lookups.values.editable')} size="small" variant="light" />;
            case EditableEnum.constant:
              return <Chip color="warning" label={t('lookups.values.constant')} size="small" variant="light" />;
          }
        }
      },
      {
        header: t('lookups.values.startDateActive'),
        accessorKey: 'startDateActive',
        sortingFn: 'datetime',
        meta: {
          className: 'cell-center',
          filtervariant: 'dateRange'
        },
        cell: (props: any) => {
          return formatDateString(props.getValue(), formatDate.paramCase.dateTime);
        }
      },
      {
        header: t('lookups.values.endDateActive'),
        accessorKey: 'endDateActive',
        sortingFn: 'datetime',
        meta: {
          className: 'cell-center',
          filtervariant: 'dateRange'
        },
        cell: (props: any) => {
          return formatDateString(props.getValue(), formatDate.paramCase.dateTime);
        }
      }
    ],
    [t]
  );

  return { data, columns, valueTranslation };
};

export default useLookupValues;
