export interface DigitalTwinFragment {
  id: string;
  digital_twin_id: string;
  code: string;
  name?: string;
  fragment_code: string;
  fragment_version?: string;
  config?: string;
  status: string;
}

export interface DigitalTwinConnection {
  id: string;
  digital_twin_id: string;
  code: string;
  name?: string;
  description?: string;
  type: 'kafka' | 'rest';
  from_fragment_code: string;
  from_fragment_version?: string;
  from_fragment_id?: string;
  from_config?: Record<string, unknown>;
  to_fragment_code: string;
  to_fragment_version?: string;
  to_fragment_id?: string;
  to_config?: Record<string, unknown>;
  config?: Record<string, unknown>;
}

export interface DigitalTwinWidgetConnection {
  id: string;
  digital_twin_id: string;
  code: string;
  name?: string;
  description?: string;
  type: 'rest' | 'websocket';
  from_fragment_code: string;
  from_fragment_version?: string;
  from_fragment_id?: string;
  from_config?: Record<string, unknown>;
  to_widget_id: string;
  to_widget_code?: string;
  to_widget_version?: string;
  to_config?: Record<string, unknown>;
  config?: Record<string, unknown>;
}

export interface FragmentRegistryItem {
  id: string;
  code: string;
  name: string;
  description?: string;
  version?: string;
  config?: Record<string, unknown>;
}

export interface FragmentCreateRequest {
  code: string;
  name?: string;
  fragment_code: string;
  fragment_version?: string;
  config?: Record<string, unknown>;
}

export interface ConnectionCreateRequest {
  code: string;
  name?: string;
  description?: string;
  type: 'kafka' | 'rest';
  from_fragment_code: string;
  from_fragment_version?: string;
  from_fragment_id?: string;
  from_config?: Record<string, unknown>;
  to_fragment_code: string;
  to_fragment_version?: string;
  to_fragment_id?: string;
  to_config?: Record<string, unknown>;
  config?: Record<string, unknown>;
}

export interface WidgetConnectionCreateRequest {
  code: string;
  name?: string;
  description?: string;
  type: 'rest' | 'websocket';
  from_fragment_code: string;
  from_fragment_version?: string;
  from_fragment_id?: string;
  from_config?: Record<string, unknown>;
  to_widget_id: string;
  to_widget_code?: string;
  to_widget_version?: string;
  to_config?: Record<string, unknown>;
  config?: Record<string, unknown>;
}

// Fragment contract types for fragment registry API responses
export interface FragmentContract {
  id: string;
  fragment_id: string;
  direction: 'produces' | 'consumes';
  contract_type: 'kafka' | 'rest' | 'websocket';
  key: string;
  description?: string;
  schema_url?: string;
  details: Record<string, unknown>;
}

export interface ContractsGrouped {
  kafka: FragmentContract[];
  rest: FragmentContract[];
  websocket: FragmentContract[];
}

export interface ContractsResponse {
  produces: ContractsGrouped;
  consumes: ContractsGrouped;
}

export interface DigitalTwin {
  id: string;
  draft_id: string;
  name?: string;
  description?: string;
  version?: string;
  status: 'PENDING' | 'DEPLOYING' | 'READY' | 'FAILED' | 'DELETING';
  created_date?: string;
  modified_date?: string;
  fragments: DigitalTwinFragment[];
  connections: DigitalTwinConnection[];
}
