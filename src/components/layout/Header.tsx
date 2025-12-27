import { Bell, Search, Plus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  title: string;
  subtitle?: string;
  alertCount: number;
  onNewSale?: () => void;
}

export function Header({ title, subtitle, alertCount, onNewSale }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products, categories..."
              className="pl-9 w-64 bg-secondary/50 border-0 focus-visible:ring-1"
            />
          </div>

          {/* Quick Sale */}
          {onNewSale && (
            <Button variant="gradient" onClick={onNewSale} className="hidden sm:flex">
              <Plus className="w-4 h-4" />
              New Sale
            </Button>
          )}

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            {alertCount > 0 && (
              <Badge
                variant="critical"
                className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-[10px] animate-pulse-soft"
              >
                {alertCount}
              </Badge>
            )}
          </Button>

          {/* Profile */}
          <Button variant="ghost" size="icon" className="rounded-full">
            <div className="w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center">
              <User className="w-4 h-4 text-accent-foreground" />
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}
