import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Building, 
  Factory, 
  MapPin, 
  Settings, 
  Wifi, 
  Database,
  Shield,
  Activity,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: Activity,
    color: 'text-accent'
  },
  {
    title: 'Jerarquía Física',
    items: [
      { title: 'Sitios', href: '/sites', icon: MapPin },
      { title: 'Plantas', href: '/plants', icon: Building },
      { title: 'Áreas', href: '/areas', icon: Factory },
      { title: 'Equipos', href: '/equipment', icon: Settings }
    ]
  },
  {
    title: 'Dispositivos IoT',
    items: [
      { title: 'Dispositivos', href: '/devices', icon: Wifi },
      { title: 'Canales', href: '/channels', icon: Database },
      { title: 'Credenciales', href: '/credentials', icon: Shield }
    ]
  }
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className={cn(
      "bg-card border-r border-border transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-primary-accent flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">ATAI Context</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 p-0"
        >
          {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </Button>
      </div>

      <div className="px-3 py-4 space-y-2">
        {navigationItems.map((item, index) => (
          <div key={index}>
            {item.href ? (
              <Link
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                  "hover:bg-muted",
                  location.pathname === item.href && "bg-primary/10 text-primary",
                  isCollapsed && "justify-center"
                )}
              >
                <item.icon className={cn("w-5 h-5", item.color)} />
                {!isCollapsed && <span className="font-medium">{item.title}</span>}
              </Link>
            ) : (
              <div>
                {!isCollapsed && (
                  <div className="px-3 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    {item.title}
                  </div>
                )}
                <div className="space-y-1">
                  {item.items?.map((subItem) => (
                    <Link
                      key={subItem.href}
                      to={subItem.href}
                      className={cn(
                        "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                        "hover:bg-muted",
                        location.pathname === subItem.href && "bg-primary/10 text-primary",
                        isCollapsed && "justify-center"
                      )}
                    >
                      <subItem.icon className="w-5 h-5" />
                      {!isCollapsed && <span>{subItem.title}</span>}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}