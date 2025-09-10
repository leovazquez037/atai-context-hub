import { Settings, Tag, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockEquipment, mockAreas } from '@/lib/mock-data';

export default function Equipment() {
  const equipmentWithAreas = mockEquipment.map(equipment => ({
    ...equipment,
    area: mockAreas.find(area => area.area_id === equipment.area_id)
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Equipos</h1>
        <p className="text-muted-foreground mt-2">
          Activos industriales y equipamiento de planta
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {equipmentWithAreas.map((equipment) => (
          <Card key={equipment.equipment_id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Settings className="w-8 h-8 text-primary" />
                <Badge variant="secondary">Operativo</Badge>
              </div>
              <CardTitle className="text-xl">
                {equipment.name || `Equipo ${equipment.equipment_id.slice(0, 8)}`}
              </CardTitle>
              <CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="w-4 h-4" />
                  <span>{equipment.area?.name}</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {equipment.sap_tag && (
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      SAP: <code className="bg-muted px-2 py-1 rounded text-xs font-mono">{equipment.sap_tag}</code>
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Creado: {new Date(equipment.created_at).toLocaleDateString('es-ES')}</span>
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Área: <span className="text-foreground font-medium">{equipment.area?.name}</span>
                  </p>
                  {equipment.area?.path && (
                    <p className="text-sm text-muted-foreground">
                      Ruta: <code className="text-xs">{equipment.area.path}</code>
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