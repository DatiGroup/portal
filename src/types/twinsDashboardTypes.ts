export const DashboardLayout = {
  GRID: 'grid',
  LIST: 'list',
  FLEX: 'flex'
} as const;

export type DashboardLayoutType = (typeof DashboardLayout)[keyof typeof DashboardLayout];

export interface Dashboard {
  id: string;
  digital_twin_id: string;
  name?: string;
  description?: string;
  layout: DashboardLayoutType;
  is_default: boolean;
}
