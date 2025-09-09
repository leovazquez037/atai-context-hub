import { useState } from 'react';
import { Plus, MapPin, Building, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { mockSites, mockPlants } from '@/lib/mock-data';
import { Site } from '@/types/atai';

export default function Sites() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredSites = mockSites.filter(site =>
    site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    site.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPlantsCount = (siteId: string) => {
    return mockPlants.filter(plant => plant.site_id === siteId).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Sitios
          </h1>
          <p className="text-muted-foreground">
            Gestión de ubicaciones físicas y complejos industriales
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-primary-accent hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Sitio
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1 max-w-sm">
          <Input
            placeholder="Buscar sitios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-background"
          />
        </div>
        <Badge variant="outline" className="text-sm">
          {filteredSites.length} sitio{filteredSites.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredSites.map((site: Site) => (
          <Card key={site.site_id} className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="truncate">{site.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-2">Dirección</div>
                <div className="text-sm font-medium">
                  {site.address || 'No especificada'}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Zona Horaria</div>
                  <div className="text-sm font-medium flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{site.timezone}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Plantas</div>
                  <div className="flex items-center space-x-1">
                    <Building className="w-4 h-4 text-accent" />
                    <span className="font-bold text-lg">{getPlantsCount(site.site_id)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <div className="text-xs text-muted-foreground">
                  Creado: {new Date(site.created_at).toLocaleDateString('es-AR')}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSites.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MapPin className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No se encontraron sitios
            </h3>
            <p className="text-muted-foreground text-center">
              {searchTerm 
                ? 'Intenta ajustar los criterios de búsqueda'
                : 'Comienza agregando tu primer sitio industrial'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}