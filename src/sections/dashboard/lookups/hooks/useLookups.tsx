import OrderedListOutlined from '@ant-design/icons/OrderedListOutlined';
import { Box } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';
import IconButton from 'components/@extended/IconButton';
import Tooltip from 'components/@extended/Tooltip';
import { useMemo, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useGetLookupsQuery } from 'store/slices/lookup/lookupSlice';
import { LookupResponse } from 'store/slices/lookup/types';
import { LookupTable } from 'types/tableTypes';
import { fuzzySort } from 'utils/sortings';

interface UseLookupsViewReturn {
  data: LookupTable[];
  columns: ColumnDef<LookupTable>[];
}

const useLookups = (): UseLookupsViewReturn => {
  const { data: apiData } = useGetLookupsQuery();
  const { t, i18n } = useTranslation();
  const { language: currentLang } = i18n;
  const navigate = useNavigate();

  const data: LookupTable[] = useMemo(
    () =>
      apiData?.map((lookup: LookupResponse) => {
        const translation = lookup.tl?.find((tl) => tl.languageCode === currentLang)?.translation;

        return {
          lookupType: lookup.lookupType,
          purpose: lookup.purpose ?? '',
          meaning: translation?.meaning ?? '',
          description: translation?.description ?? ''
        };
      }) || [],
    [apiData, currentLang]
  );

  const columns = useMemo<ColumnDef<LookupTable>[]>(
    () => [
      {
        header: t('lookups.types.lookupType'),
        accessorKey: 'lookupType',
        sortingFn: fuzzySort,
        meta: {
          className: 'cell-start'
        }
      },
      {
        header: t('lookups.types.meaning'),
        accessorKey: 'meaning',
        sortingFn: fuzzySort,
        meta: {
          className: 'cell-start'
        }
      },
      {
        header: t('lookups.types.description'),
        accessorKey: 'description',
        meta: {
          className: 'cell-start'
        }
      },
      {
        header: t('lookupValueAdd.purpose'),
        accessorKey: 'purpose',
        meta: {
          className: 'cell-start'
        }
      },
      {
        header: t('lookups.types.actions'),
        accessorKey: 'actions',
        meta: {
          className: 'cell-center'
        },
        cell: ({ row }) => (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title={t('lookups.types.values')}>
              <IconButton color="secondary" onClick={(e: MouseEvent<HTMLButtonElement>) => navigate(`${row.original.lookupType}/values`)}>
                <OrderedListOutlined />
              </IconButton>
            </Tooltip>
          </Box>
        )
      }
    ],
    [navigate, t]
  );

  return { data, columns };
};

export default useLookups;
