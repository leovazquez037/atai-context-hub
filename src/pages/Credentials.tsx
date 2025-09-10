import { Shield, Key, AlertTriangle, Calendar, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockCredentials, mockDevices } from '@/lib/mock-data';

export default function Credentials() {
  const credentialsWithDevices = mockCredentials.map(credential => ({
    ...credential,
    device: mockDevices.find(device => device.device_id === credential.device_id)
  }));

  const getCredentialIcon = (type: string) => {
    switch (type) {
      case 'APPKEY':
      case 'NWKKEY':
        return Key;
      case 'X509':
        return Shield;
      default:
        return Key;
    }
  };

  const getCredentialBadge = (state: string) => {
    switch (state) {
      case 'ACTIVE':
        return <Badge variant="default" className="bg-green-100 text-green-800">Activa</Badge>;
      case 'REVOKED':
        return <Badge variant="destructive">Revocada</Badge>;
      case 'COMPROMISED':
        return <Badge variant="destructive">Comprometida</Badge>;
      default:
        return <Badge variant="secondary">{state}</Badge>;
    }
  };

  const isExpiringSoon = (expiresAt: string) => {
    const expiry = new Date(expiresAt);
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    return expiry <= thirtyDaysFromNow;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Credenciales</h1>
        <p className="text-muted-foreground mt-2">
          Claves y certificados de seguridad para dispositivos IoT
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {credentialsWithDevices.map((credential) => {
          const CredIcon = getCredentialIcon(credential.cred_type);
          const expiringSoon = credential.expires_at ? isExpiringSoon(credential.expires_at) : false;
          
          return (
            <Card key={credential.cred_id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CredIcon className="w-8 h-8 text-primary" />
                  <div className="flex items-center gap-2">
                    {expiringSoon && <AlertTriangle className="w-4 h-4 text-orange-500" />}
                    {getCredentialBadge(credential.state)}
                  </div>
                </div>
                <CardTitle className="text-xl">{credential.cred_type}</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <Shield className="w-4 h-4" />
                    <span>{credential.device?.identity.alias || 'Dispositivo desconocido'}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {credential.algo && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Algoritmo:</span>
                      <Badge variant="outline">{credential.algo}</Badge>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Emitida: </span>
                      <span>{new Date(credential.issued_at).toLocaleDateString('es-ES')}</span>
                    </div>
                    
                    {credential.expires_at && (
                      <div className={`flex items-center gap-2 text-sm ${expiringSoon ? 'text-orange-600' : ''}`}>
                        {expiringSoon ? <AlertTriangle className="w-4 h-4" /> : <Calendar className="w-4 h-4 text-muted-foreground" />}
                        <span className="text-muted-foreground">Expira: </span>
                        <span>{new Date(credential.expires_at).toLocaleDateString('es-ES')}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      Dispositivo: <span className="text-foreground font-medium">{credential.device?.identity.alias}</span>
                    </p>
                    <p className="text-xs text-muted-foreground break-all">
                      Ref: <code className="text-xs">{credential.value_ref}</code>
                    </p>
                  </div>

                  {expiringSoon && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-600" />
                        <span className="text-sm text-orange-700 font-medium">Expira pronto</span>
                      </div>
                      <p className="text-xs text-orange-600 mt-1">
                        Esta credencial expira en menos de 30 días
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}