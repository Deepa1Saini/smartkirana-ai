import { Bell, AlertTriangle, Package, Clock, Check, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockAlerts } from '@/data/mockData';
import { cn } from '@/lib/utils';

export function AlertsView() {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'low_stock':
        return <Package className="w-5 h-5" />;
      case 'out_of_stock':
        return <AlertTriangle className="w-5 h-5" />;
      case 'expiry':
        return <Clock className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-info/10 text-info border-info/20';
    }
  };

  const unreadCount = mockAlerts.filter(a => !a.isRead).length;
  const criticalCount = mockAlerts.filter(a => a.severity === 'critical').length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{mockAlerts.length}</p>
                <p className="text-sm text-muted-foreground">Total Alerts</p>
              </div>
              <Bell className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-destructive">{criticalCount}</p>
                <p className="text-sm text-muted-foreground">Critical</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">{unreadCount}</p>
                <p className="text-sm text-muted-foreground">Unread</p>
              </div>
              <Badge variant="critical">{unreadCount}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
        <Button variant="outline" size="sm">
          <Check className="w-4 h-4 mr-2" />
          Mark All Read
        </Button>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {mockAlerts.map((alert) => (
          <Card
            key={alert.id}
            className={cn(
              "transition-all hover:shadow-md",
              !alert.isRead && "border-l-4 border-l-primary"
            )}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className={cn(
                  "p-2 rounded-lg",
                  getSeverityColor(alert.severity)
                )}>
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-semibold">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                    </div>
                    <Badge variant={
                      alert.severity === 'critical' ? 'critical' :
                      alert.severity === 'high' ? 'critical' : 
                      alert.severity === 'medium' ? 'warning' : 'info'
                    }>
                      {alert.severity}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-xs text-muted-foreground">
                      {new Date(alert.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    {alert.productId && (
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                        View Product →
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
