import { Building, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockPlants, mockSites } from '@/lib/mock-data';

export default function Plants() {
  const plantsWithSites = mockPlants.map(plant => ({
    ...plant,
    site: mockSites.find(site => site.site_id === plant.site_id)
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Plantas</h1>
        <p className="text-muted-foreground mt-2">
          Gestión de plantas industriales y edificaciones
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plantsWithSites.map((plant) => (
          <Card key={plant.plant_id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Building className="w-8 h-8 text-primary" />
                <Badge variant="secondary">Activa</Badge>
              </div>
              <CardTitle className="text-xl">{plant.name}</CardTitle>
              <CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="w-4 h-4" />
                  <span>{plant.site?.name}</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Creada: {new Date(plant.created_at).toLocaleDateString('es-ES')}</span>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Sitio: <span className="text-foreground font-medium">{plant.site?.name}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Zona horaria: <span className="text-foreground font-medium">{plant.site?.timezone}</span>
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