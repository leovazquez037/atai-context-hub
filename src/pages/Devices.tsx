import { useState } from 'react';
import { Plus, Wifi, Battery, Signal, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockDevices, mockConnectivityNetworks } from '@/lib/mock-data';
import { Device, LifecycleState, TechType } from '@/types/atai';

export default function Devices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [techFilter, setTechFilter] = useState<string>('all');
  
  const filteredDevices = mockDevices.filter(device => {
    const matchesSearch = 
      device.identity.alias?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.identity.dev_eui?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.identity.imei?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || device.lifecycle_state === statusFilter;
    
    const network = mockConnectivityNetworks.find(n => n.connectivity_id === device.connectivity_id);
    const matchesTech = techFilter === 'all' || network?.tech_type === techFilter;
    
    return matchesSearch && matchesStatus && matchesTech;
  });

  const getStatusColor = (status: LifecycleState) => {
    switch (status) {
      case 'ACTIVE': return 'default';
      case 'MAINT': return 'secondary';
      case 'RETIRED': return 'outline';
      default: return 'outline';
    }
  };

  const getTechTypeIcon = (techType: TechType) => {
    switch (techType) {
      case 'LORAWAN': return '📡';
      case 'NBIOT': return '📱';
      case 'LTEM': return '📶';
      case 'WIFI': return '📶';
      case 'SAT': return '🛰️';
      default: return '📡';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Dispositivos IoT
          </h1>
          <p className="text-muted-foreground">
            Gestión de dispositivos conectados y sus estados
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-primary-accent hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Dispositivo
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 max-w-sm">
          <Input
            placeholder="Buscar por alias, DevEUI, IMEI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-background"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="ACTIVE">Activo</SelectItem>
            <SelectItem value="MAINT">Mantenimiento</SelectItem>
            <SelectItem value="RETIRED">Retirado</SelectItem>
          </SelectContent>
        </Select>

        <Select value={techFilter} onValueChange={setTechFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Tecnología" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las tecnologías</SelectItem>
            <SelectItem value="LORAWAN">LoRaWAN</SelectItem>
            <SelectItem value="NBIOT">NB-IoT</SelectItem>
            <SelectItem value="LTEM">LTE-M</SelectItem>
            <SelectItem value="WIFI">WiFi</SelectItem>
            <SelectItem value="SAT">Satelital</SelectItem>
          </SelectContent>
        </Select>

        <Badge variant="outline" className="text-sm self-center">
          {filteredDevices.length} dispositivo{filteredDevices.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDevices.map((device: Device) => {
          const network = mockConnectivityNetworks.find(n => n.connectivity_id === device.connectivity_id);
          
          return (
            <Card key={device.device_id} className="hover:shadow-lg transition-all cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Wifi className="w-5 h-5 text-primary" />
                    <span className="truncate">
                      {device.identity.alias || device.identity.dev_eui || device.identity.imei}
                    </span>
                  </div>
                  <Badge variant={getStatusColor(device.lifecycle_state)}>
                    {device.lifecycle_state}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Identidad</div>
                    <div className="text-xs font-mono">
                      {device.identity.dev_eui && (
                        <div>DevEUI: {device.identity.dev_eui}</div>
                      )}
                      {device.identity.imei && (
                        <div>IMEI: {device.identity.imei}</div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Firmware</div>
                    <div className="text-sm font-medium">
                      {device.firmware_ver || 'No especificado'}
                    </div>
                  </div>
                </div>

                {network && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Conectividad</div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getTechTypeIcon(network.tech_type)}</span>
                        <div>
                          <div className="text-sm font-medium">{network.tech_type}</div>
                          <div className="text-xs text-muted-foreground">{network.network_code}</div>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Signal className="w-4 h-4 text-success" />
                        <Battery className="w-4 h-4 text-warning" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t border-border">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Actualizado: {new Date(device.updated_at).toLocaleDateString('es-AR')}</span>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Settings className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredDevices.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Wifi className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No se encontraron dispositivos
            </h3>
            <p className="text-muted-foreground text-center">
              {searchTerm || statusFilter !== 'all' || techFilter !== 'all'
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'Comienza agregando tu primer dispositivo IoT'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}