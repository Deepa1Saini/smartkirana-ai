import { AlertTriangle, PackageX, Clock, TrendingDown, ChevronRight, Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert } from '@/types';
import { cn } from '@/lib/utils';

interface AlertsListProps {
  alerts: Alert[];
  maxItems?: number;
  showViewAll?: boolean;
  onViewAll?: () => void;
}

const alertIcons = {
  out_of_stock: PackageX,
  low_stock: AlertTriangle,
  expiry_near: Clock,
  expired: AlertTriangle,
  dead_stock: TrendingDown,
};

const alertColors = {
  critical: 'border-l-destructive',
  high: 'border-l-warning',
  medium: 'border-l-info',
  low: 'border-l-muted-foreground',
};

export function AlertsList({ alerts, maxItems = 5, showViewAll = true, onViewAll }: AlertsListProps) {
  const displayedAlerts = alerts.slice(0, maxItems);
  const unreadCount = alerts.filter(a => !a.isRead).length;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Alerts</CardTitle>
            {unreadCount > 0 && (
              <Badge variant="critical">{unreadCount} new</Badge>
            )}
          </div>
          {showViewAll && (
            <Button variant="ghost" size="sm" onClick={onViewAll} className="text-primary">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {displayedAlerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Check className="w-12 h-12 mx-auto mb-2 text-success" />
            <p>All clear! No alerts.</p>
          </div>
        ) : (
          displayedAlerts.map((alert, index) => {
            const Icon = alertIcons[alert.type];
            return (
              <div
                key={alert.id}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg border-l-4 bg-card hover:bg-secondary/50 transition-colors cursor-pointer animate-slide-up opacity-0",
                  alertColors[alert.severity],
                  !alert.isRead && "bg-secondary/30"
                )}
                style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  alert.severity === 'critical' && "bg-destructive/10",
                  alert.severity === 'high' && "bg-warning/10",
                  alert.severity === 'medium' && "bg-info/10",
                  alert.severity === 'low' && "bg-muted"
                )}>
                  <Icon className={cn(
                    "w-4 h-4",
                    alert.severity === 'critical' && "text-destructive",
                    alert.severity === 'high' && "text-warning",
                    alert.severity === 'medium' && "text-info",
                    alert.severity === 'low' && "text-muted-foreground"
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "text-sm",
                    !alert.isRead && "font-medium"
                  )}>{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(alert.createdAt).toLocaleString('en-IN', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      day: 'numeric',
                      month: 'short'
                    })}
                  </p>
                </div>
                {!alert.isRead && (
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
                )}
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
