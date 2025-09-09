// ATAI Context Database Types - Based on PostgreSQL schema

export type LifecycleState = 'ACTIVE' | 'MAINT' | 'RETIRED';
export type CredState = 'ACTIVE' | 'REVOKED' | 'COMPROMISED';
export type CredType = 'APPKEY' | 'NWKKEY' | 'SIM_K' | 'X509';
export type TechType = 'LORAWAN' | 'NBIOT' | 'LTEM' | 'SAT' | 'WIFI';
export type ServerRole = 'LORAWAN_NS' | 'APN_SVR' | 'IOT_CORE' | 'SAT_GW';
export type DatastoreType = 'TSDB' | 'DATALAKE' | 'MESSAGEBUS' | 'APPDB';

export interface Site {
  site_id: string;
  name: string;
  address?: string;
  timezone: string;
  created_at: string;
}

export interface Plant {
  plant_id: string;
  site_id: string;
  name: string;
  created_at: string;
  site?: Site;
}

export interface Area {
  area_id: string;
  plant_id: string;
  parent_area_id?: string;
  name: string;
  path?: string;
  created_at: string;
  plant?: Plant;
  parent_area?: Area;
  children?: Area[];
}

export interface Equipment {
  equipment_id: string;
  area_id: string;
  sap_tag?: string;
  name?: string;
  created_at: string;
  area?: Area;
}

export interface Server {
  server_id: string;
  role: ServerRole;
  tech_type: TechType;
  endpoint: string;
  protocol: string;
  region?: string;
  auth_method?: string;
  status: string;
  created_at: string;
}

export interface ConnectivityNetwork {
  connectivity_id: string;
  tech_type: TechType;
  network_code: string;
  provider?: string;
  qos_profile?: Record<string, any>;
  server_id: string;
  created_at: string;
  server?: Server;
}

export interface Device {
  device_id: string;
  identity: {
    dev_eui?: string;
    imei?: string;
    alias?: string;
    [key: string]: any;
  };
  firmware_ver?: string;
  lifecycle_state: LifecycleState;
  connectivity_id: string;
  created_at: string;
  updated_at: string;
  connectivity_network?: ConnectivityNetwork;
  channels?: Channel[];
  credentials?: Credential[];
  equipment?: Equipment[];
  tags?: Tag[];
}

export interface Channel {
  channel_id: string;
  device_id: string;
  variable: string;
  unit?: string;
  sample_rate_ms?: number;
  measurement: string;
  tag_selector: Record<string, any>;
  created_at: string;
  device?: Device;
}

export interface Credential {
  cred_id: string;
  device_id: string;
  cred_type: CredType;
  value_ref: string;
  algo?: string;
  issued_at: string;
  expires_at?: string;
  state: CredState;
  device?: Device;
}

export interface Datastore {
  datastore_id: string;
  ds_type: DatastoreType;
  engine?: string;
  retention_days?: number;
  replica_factor?: number;
  encryption?: string;
  created_at: string;
}

export interface DataPipeline {
  link_id: string;
  server_id: string;
  datastore_id: string;
  transport: string;
  topic: string;
  transform?: string;
  environment: string;
  sla_json?: Record<string, any>;
  cipher?: string;
  created_at: string;
  server?: Server;
  datastore?: Datastore;
}

export interface Tag {
  tag_id: string;
  name: string;
  category?: string;
}

// Dashboard metrics interface
export interface DashboardMetrics {
  totalDevices: number;
  activeDevices: number;
  devicesByTechType: Record<TechType, number>;
  devicesByLifecycleState: Record<LifecycleState, number>;
  credentialsExpiringSoon: number;
  recentActivity: {
    newDevices: number;
    updatedDevices: number;
    period: string;
  };
}

// Hierarchical tree node for navigation
export interface TreeNode {
  id: string;
  name: string;
  type: 'site' | 'plant' | 'area' | 'equipment';
  children?: TreeNode[];
  metadata?: Record<string, any>;
}