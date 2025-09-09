import { 
  Site, Plant, Area, Equipment, Device, ConnectivityNetwork, 
  Server, Channel, Credential, Tag, DashboardMetrics 
} from '@/types/atai';

// Mock data for demonstration
export const mockSites: Site[] = [
  {
    site_id: '1',
    name: 'Planta Norte Buenos Aires',
    address: 'Av. Industrial 1500, San Martín, Buenos Aires',
    timezone: 'America/Argentina/Buenos_Aires',
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    site_id: '2', 
    name: 'Complejo Córdoba',
    address: 'Parque Industrial Ferreyra, Córdoba',
    timezone: 'America/Argentina/Cordoba',
    created_at: '2024-02-01T09:30:00Z'
  }
];

export const mockPlants: Plant[] = [
  {
    plant_id: '1',
    site_id: '1',
    name: 'Planta de Ensamblaje A',
    created_at: '2024-01-15T10:15:00Z'
  },
  {
    plant_id: '2',
    site_id: '1', 
    name: 'Almacén Central',
    created_at: '2024-01-15T10:20:00Z'
  },
  {
    plant_id: '3',
    site_id: '2',
    name: 'Línea de Producción Principal',
    created_at: '2024-02-01T10:00:00Z'
  }
];

export const mockAreas: Area[] = [
  {
    area_id: '1',
    plant_id: '1',
    name: 'Línea 1 - Motores',
    path: 'norte.ensamblaje_a.linea_1',
    created_at: '2024-01-15T11:00:00Z'
  },
  {
    area_id: '2', 
    plant_id: '1',
    parent_area_id: '1',
    name: 'Estación de Soldadura',
    path: 'norte.ensamblaje_a.linea_1.soldadura',
    created_at: '2024-01-15T11:15:00Z'
  },
  {
    area_id: '3',
    plant_id: '2',
    name: 'Zona de Almacenamiento',
    path: 'norte.almacen.zona_a',
    created_at: '2024-01-15T11:30:00Z'
  }
];

export const mockEquipment: Equipment[] = [
  {
    equipment_id: '1',
    area_id: '1',
    sap_tag: 'MTR-001-L1',
    name: 'Motor Principal Línea 1',
    created_at: '2024-01-15T12:00:00Z'
  },
  {
    equipment_id: '2',
    area_id: '2', 
    sap_tag: 'SLD-002-EST1',
    name: 'Soldadora Automática Est.1',
    created_at: '2024-01-15T12:15:00Z'
  },
  {
    equipment_id: '3',
    area_id: '3',
    sap_tag: 'ALM-003-ZA',
    name: 'Sistema Transportador A',
    created_at: '2024-01-15T12:30:00Z'
  }
];

export const mockServers: Server[] = [
  {
    server_id: '1',
    role: 'LORAWAN_NS',
    tech_type: 'LORAWAN',
    endpoint: 'ns.atai.com.ar:1700',
    protocol: 'UDP',
    region: 'AU915',
    auth_method: 'TLS_PSK',
    status: 'prod',
    created_at: '2024-01-10T08:00:00Z'
  },
  {
    server_id: '2',
    role: 'IOT_CORE',
    tech_type: 'NBIOT',
    endpoint: 'iot-core.atai.com.ar:8883',
    protocol: 'MQTT',
    region: 'SA',
    auth_method: 'X509',
    status: 'prod',
    created_at: '2024-01-10T08:30:00Z'
  }
];

export const mockConnectivityNetworks: ConnectivityNetwork[] = [
  {
    connectivity_id: '1',
    tech_type: 'LORAWAN',
    network_code: 'ATAI_LoRa_AU915',
    provider: 'ATAI Networks',
    qos_profile: { class: 'A', adr: true },
    server_id: '1',
    created_at: '2024-01-10T09:00:00Z'
  },
  {
    connectivity_id: '2',
    tech_type: 'NBIOT',
    network_code: 'CLARO_NBIOT_722310',
    provider: 'Claro Argentina',
    qos_profile: { bearer: 'NB1', qci: 9 },
    server_id: '2',
    created_at: '2024-01-10T09:15:00Z'
  }
];

export const mockDevices: Device[] = [
  {
    device_id: '1',
    identity: {
      dev_eui: '70B3D57ED004C1A2',
      alias: 'Sensor-Temp-L1-001'
    },
    firmware_ver: '2.1.4',
    lifecycle_state: 'ACTIVE',
    connectivity_id: '1',
    created_at: '2024-01-16T10:00:00Z',
    updated_at: '2024-01-20T15:30:00Z'
  },
  {
    device_id: '2',
    identity: {
      imei: '862950051049324',
      alias: 'Vibra-Monitor-MTR001'
    },
    firmware_ver: '1.8.2',
    lifecycle_state: 'ACTIVE',
    connectivity_id: '2',
    created_at: '2024-01-17T11:30:00Z',
    updated_at: '2024-01-21T09:15:00Z'
  },
  {
    device_id: '3',
    identity: {
      dev_eui: 'A8B2C3D4E5F60708',
      alias: 'Power-Meter-SLD002'
    },
    firmware_ver: '2.0.1',
    lifecycle_state: 'MAINT',
    connectivity_id: '1',
    created_at: '2024-01-18T14:45:00Z',
    updated_at: '2024-01-22T08:00:00Z'
  }
];

export const mockChannels: Channel[] = [
  {
    channel_id: '1',
    device_id: '1',
    variable: 'temperature',
    unit: '°C',
    sample_rate_ms: 60000,
    measurement: 'temperature_sensors',
    tag_selector: { dev_eui: '70B3D57ED004C1A2', channel: 'temp_1' },
    created_at: '2024-01-16T10:15:00Z'
  },
  {
    channel_id: '2',
    device_id: '2',
    variable: 'vibration_rms',
    unit: 'mm/s',
    sample_rate_ms: 30000,
    measurement: 'vibration_monitoring',
    tag_selector: { imei: '862950051049324', axis: 'x' },
    created_at: '2024-01-17T11:45:00Z'
  },
  {
    channel_id: '3',
    device_id: '3',
    variable: 'active_power',
    unit: 'kW',
    sample_rate_ms: 15000,
    measurement: 'power_consumption',
    tag_selector: { dev_eui: 'A8B2C3D4E5F60708', phase: 'total' },
    created_at: '2024-01-18T15:00:00Z'
  }
];

export const mockCredentials: Credential[] = [
  {
    cred_id: '1',
    device_id: '1',
    cred_type: 'APPKEY',
    value_ref: '/vault/lorawan/appkeys/70B3D57ED004C1A2',
    algo: 'AES128',
    issued_at: '2024-01-16T10:00:00Z',
    expires_at: '2025-01-16T10:00:00Z',
    state: 'ACTIVE'
  },
  {
    cred_id: '2',
    device_id: '2',
    cred_type: 'X509',
    value_ref: '/vault/x509/devices/862950051049324.pem',
    algo: 'RSA2048',
    issued_at: '2024-01-17T11:30:00Z',
    expires_at: '2024-04-17T11:30:00Z',
    state: 'ACTIVE'
  }
];

export const mockTags: Tag[] = [
  { tag_id: '1', name: 'atex', category: 'safety' },
  { tag_id: '2', name: 'critical', category: 'priority' },
  { tag_id: '3', name: 'predictive_maintenance', category: 'maintenance' },
  { tag_id: '4', name: 'energy_monitoring', category: 'sustainability' }
];

export const mockDashboardMetrics: DashboardMetrics = {
  totalDevices: 3,
  activeDevices: 2,
  devicesByTechType: {
    LORAWAN: 2,
    NBIOT: 1,
    LTEM: 0,
    SAT: 0,
    WIFI: 0
  },
  devicesByLifecycleState: {
    ACTIVE: 2,
    MAINT: 1,
    RETIRED: 0
  },
  credentialsExpiringSoon: 1,
  recentActivity: {
    newDevices: 3,
    updatedDevices: 3,
    period: 'last 7 days'
  }
};