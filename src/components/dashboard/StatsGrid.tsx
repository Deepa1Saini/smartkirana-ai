import { TrendingUp, TrendingDown, Package, IndianRupee, ShoppingCart, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  iconBg?: string;
  delay?: number;
}

export function StatCard({ title, value, change, changeLabel, icon, iconBg = 'bg-primary/10', delay = 0 }: StatCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card 
      variant="stat" 
      className="animate-slide-up opacity-0" 
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {change !== undefined && (
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              isPositive && "text-success",
              isNegative && "text-destructive",
              !isPositive && !isNegative && "text-muted-foreground"
            )}>
              {isPositive && <TrendingUp className="w-4 h-4" />}
              {isNegative && <TrendingDown className="w-4 h-4" />}
              <span>{isPositive ? '+' : ''}{change}%</span>
              {changeLabel && <span className="text-muted-foreground font-normal">{changeLabel}</span>}
            </div>
          )}
        </div>
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", iconBg)}>
          {icon}
        </div>
      </div>
    </Card>
  );
}

interface StatsGridProps {
  salesData: {
    today: number;
    yesterday: number;
    thisWeek: number;
    thisMonth: number;
    growth: number;
  };
  totalProducts: number;
  lowStockCount: number;
  totalOrders: number;
}

export function StatsGrid({ salesData, totalProducts, lowStockCount, totalOrders }: StatsGridProps) {
  const stats = [
    {
      title: "Today's Sales",
      value: `₹${salesData.today.toLocaleString('en-IN')}`,
      change: salesData.growth,
      changeLabel: "vs yesterday",
      icon: <IndianRupee className="w-6 h-6 text-primary" />,
      iconBg: "bg-primary/10",
    },
    {
      title: "Total Products",
      value: totalProducts.toLocaleString('en-IN'),
      icon: <Package className="w-6 h-6 text-info" />,
      iconBg: "bg-info/10",
    },
    {
      title: "Orders Today",
      value: totalOrders,
      change: 8,
      changeLabel: "vs avg",
      icon: <ShoppingCart className="w-6 h-6 text-success" />,
      iconBg: "bg-success/10",
    },
    {
      title: "Low Stock Items",
      value: lowStockCount,
      icon: <AlertTriangle className="w-6 h-6 text-warning" />,
      iconBg: "bg-warning/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={stat.title} {...stat} delay={index * 100} />
      ))}
    </div>
  );
}
