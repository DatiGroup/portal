export interface WidgetUIConfig {
  width?: number;
  height?: number;
  theme?: string;
}

export interface WidgetFunctionalConfig {
  dataSource?: string;
  columns?: string[];
  refreshInterval?: number;
  [key: string]: any;
}

export interface WidgetConfig {
  functional?: WidgetFunctionalConfig;
  ui?: WidgetUIConfig;
}

export interface Widget {
  id: string;
  dashboard_id: string;
  code?: string;
  name?: string;
  description?: string;
  config?: WidgetConfig;
  widget_code: string;
  widget_version?: string;
}
