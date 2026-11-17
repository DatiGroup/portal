import { ColumnDef, ExpandedState, Row } from '@tanstack/react-table';
import { ReactNode } from 'react';

export type TableOptions = {
  enableGlobalSort?: boolean;
  enableColumnSort?: boolean;
  enableHeader?: boolean;
  enableGlobalFilter?: boolean;
  enableColumnFilter?: boolean;
  enablePagination?: boolean;
  enableFooter?: boolean;
  enableCSVExport?: boolean;
  editable?: boolean;
  expanded?: ExpandedState | boolean;
};

export const defaultOptions: TableOptions = {
  enableGlobalSort: false,
  enableColumnSort: false,
  enableHeader: true,
  enableGlobalFilter: false,
  enableColumnFilter: false,
  enablePagination: false,
  enableFooter: false,
  enableCSVExport: false,
  editable: false,
  expanded: false
};

export interface ReactTableProps {
  columns: ColumnDef<any>[];
  data: any[];
  options?: TableOptions;
  canExpand?: boolean | ((row: Row<any>) => boolean);
  editable?: any;
  onRowClick?: (row: Row<any>) => void;
  renderSubComponent?: (row: Row<any>) => ReactNode;
  renderSubRows?: (row: Row<any>) => ReactNode;
  headerAdditions?: ReactNode[];
}

export enum EnabledEnum {
  enabled = 'Enabled',
  disabled = 'Disabled'
}

export enum EditableEnum {
  editable = 'Editable',
  constant = 'Constant'
}

export interface ModalInterface {
  showModal: boolean;
  data: any;
}

export interface LookupTable {
  lookupType: string;
  meaning?: string;
  description?: string;
}

export interface LookupValuesTable {
  lookupCode?: string;
  meaning?: string;
  description?: string;
  enabled?: string;
  editable?: string;
  startDateActive?: Date | string;
  endDateActive?: Date | string;
}

export interface TableSubRowsProps {
  columns: ColumnDef<any>[];
  data: any[];
  editable?: any;
  loading?: boolean;
}
