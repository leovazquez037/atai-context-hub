import { Database, Activity, Clock, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockChannels, mockDevices } from '@/lib/mock-data';

export default function Channels() {
  const channelsWithDevices = mockChannels.map(channel => ({
    ...channel,
    device: mockDevices.find(device => device.device_id === channel.device_id)
  }));

  const formatSampleRate = (ms: number) => {
    if (ms >= 60000) {
      return `${ms / 60000} min`;
    }
    return `${ms / 1000} seg`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Canales</h1>
        <p className="text-muted-foreground mt-2">
          Variables medidas y actuadas por dispositivos IoT
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {channelsWithDevices.map((channel) => (
          <Card key={channel.channel_id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Database className="w-8 h-8 text-primary" />
                <Badge variant="default">Activo</Badge>
              </div>
              <CardTitle className="text-xl capitalize">{channel.variable}</CardTitle>
              <CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Activity className="w-4 h-4" />
                  <span>{channel.device?.identity.alias || 'Dispositivo desconocido'}</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Unidad:</span>
                    <p className="font-medium">{channel.unit || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Frecuencia:</span>
                    <p className="font-medium">{channel.sample_rate_ms ? formatSampleRate(channel.sample_rate_ms) : 'N/A'}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Measurement:</span>
                    <code className="bg-muted px-2 py-1 rounded text-xs">{channel.measurement}</code>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Creado: {new Date(channel.created_at).toLocaleDateString('es-ES')}</span>
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Dispositivo: <span className="text-foreground font-medium">{channel.device?.identity.alias}</span>
                  </p>
                  {channel.device?.identity.dev_eui && (
                    <p className="text-xs text-muted-foreground">
                      DevEUI: <code className="text-xs">{channel.device.identity.dev_eui}</code>
                    </p>
                  )}
                  {channel.device?.identity.imei && (
                    <p className="text-xs text-muted-foreground">
                      IMEI: <code className="text-xs">{channel.device.identity.imei}</code>
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}