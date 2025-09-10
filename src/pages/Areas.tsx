import { Factory, TreePine, Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockAreas, mockPlants } from '@/lib/mock-data';

export default function Areas() {
  const areasWithPlants = mockAreas.map(area => ({
    ...area,
    plant: mockPlants.find(plant => plant.plant_id === area.plant_id),
    parentArea: area.parent_area_id ? mockAreas.find(a => a.area_id === area.parent_area_id) : null
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Áreas</h1>
        <p className="text-muted-foreground mt-2">
          Zonas jerárquicas y subdivisiones de plantas industriales
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {areasWithPlants.map((area) => (
          <Card key={area.area_id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Factory className="w-8 h-8 text-primary" />
                <Badge variant={area.parent_area_id ? "outline" : "default"}>
                  {area.parent_area_id ? 'Sub-área' : 'Área Principal'}
                </Badge>
              </div>
              <CardTitle className="text-xl">{area.name}</CardTitle>
              <CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <TreePine className="w-4 h-4" />
                  <span>{area.plant?.name}</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {area.path && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Ruta:</span>
                    <code className="bg-muted px-2 py-1 rounded text-xs">{area.path}</code>
                  </div>
                )}
                
                {area.parentArea && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ArrowRight className="w-4 h-4" />
                    <span>Área padre: <span className="text-foreground font-medium">{area.parentArea.name}</span></span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Creada: {new Date(area.created_at).toLocaleDateString('es-ES')}</span>
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Planta: <span className="text-foreground font-medium">{area.plant?.name}</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}