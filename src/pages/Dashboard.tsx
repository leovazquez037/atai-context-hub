import { Activity, Wifi, Shield, Database, AlertTriangle, TrendingUp } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { StatusChart } from '@/components/dashboard/StatusChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockDashboardMetrics, mockDevices, mockCredentials } from '@/lib/mock-data';

export default function Dashboard() {
  const techTypeData = Object.entries(mockDashboardMetrics.devicesByTechType)
    .filter(([_, value]) => value > 0)
    .map(([key, value]) => ({
      name: key,
      value,
      color: key === 'LORAWAN' ? 'hsl(var(--primary))' : 
             key === 'NBIOT' ? 'hsl(var(--accent))' :
             key === 'LTEM' ? 'hsl(var(--success))' :
             'hsl(var(--muted-foreground))'
    }));

  const lifecycleData = Object.entries(mockDashboardMetrics.devicesByLifecycleState)
    .filter(([_, value]) => value > 0)
    .map(([key, value]) => ({
      name: key,
      value,
      color: key === 'ACTIVE' ? 'hsl(var(--success))' : 
             key === 'MAINT' ? 'hsl(var(--warning))' :
             'hsl(var(--muted-foreground))'
    }));

  const expiringCredentials = mockCredentials.filter(cred => {
    if (!cred.expires_at) return false;
    const expiryDate = new Date(cred.expires_at);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return expiryDate <= thirtyDaysFromNow;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard ATAI Context
        </h1>
        <p className="text-muted-foreground">
          Panorama general del sistema de gestión IoT industrial
        </p>
      </div>

      {/* Métricas principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Dispositivos Totales"
          value={mockDashboardMetrics.totalDevices}
          description="Dispositivos registrados"
          icon={<Wifi className="w-5 h-5" />}
          trend={{
            value: 15,
            label: "vs mes anterior",
            isPositive: true
          }}
        />
        
        <MetricCard
          title="Dispositivos Activos"
          value={mockDashboardMetrics.activeDevices}
          description="En estado operativo"
          icon={<Activity className="w-5 h-5" />}
          trend={{
            value: 8,
            label: "vs semana anterior",
            isPositive: true
          }}
        />

        <MetricCard
          title="Credenciales por Vencer"
          value={expiringCredentials.length}
          description="Próximos 30 días"
          icon={<Shield className="w-5 h-5" />}
          trend={{
            value: -12,
            label: "vs mes anterior",
            isPositive: false
          }}
        />

        <MetricCard
          title="Canales de Datos"
          value={3}
          description="Variables monitoreadas"
          icon={<Database className="w-5 h-5" />}
          trend={{
            value: 25,
            label: "vs mes anterior", 
            isPositive: true
          }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <StatusChart
          title="Dispositivos por Tecnología"
          data={techTypeData}
        />
        
        <StatusChart
          title="Estado del Ciclo de Vida"
          data={lifecycleData}
        />
      </div>

      {/* Actividad reciente y alertas */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Actividad Reciente</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockDevices.slice(0, 3).map(device => (
              <div key={device.device_id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">
                    {device.identity.alias || device.identity.dev_eui}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Actualizado {new Date(device.updated_at).toLocaleDateString()}
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {device.lifecycle_state}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>Alertas y Notificaciones</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {expiringCredentials.map(cred => (
              <div key={cred.cred_id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">
                    Credencial {cred.cred_type} expira
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(cred.expires_at!).toLocaleDateString()}
                  </div>
                </div>
                <Badge variant="destructive" className="text-xs">
                  Crítico
                </Badge>
              </div>
            ))}
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">
                  Dispositivo en mantenimiento
                </div>
                <div className="text-xs text-muted-foreground">
                  Power-Meter-SLD002
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">
                Info
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}