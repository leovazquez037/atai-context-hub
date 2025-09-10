import { Bell, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import ataiLogo from '@/assets/atai-logo.svg';
import axenovaLogo from '@/assets/axenova-logo.svg';

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 h-full">
        <div className="flex items-center space-x-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar dispositivos, equipos..."
              className="pl-10 bg-background"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <img src={ataiLogo} alt="ATAI" className="h-6" />
            <div className="text-right">
              <div className="text-sm font-medium text-foreground">Sistema ATAI</div>
              <div className="text-xs text-muted-foreground">Contexto IoT Industrial</div>
            </div>
          </div>

          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
            >
              2
            </Badge>
          </Button>

          <Button variant="ghost" size="sm">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}