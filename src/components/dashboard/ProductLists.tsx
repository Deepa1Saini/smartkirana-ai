import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopProductsProps {
  products: Array<{
    name: string;
    sales: number;
    units: number;
  }>;
}

export function TopProducts({ products }: TopProductsProps) {
  const maxSales = Math.max(...products.map(p => p.sales));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Top Selling Products</CardTitle>
          <Badge variant="secondary">Today</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {products.map((product, index) => (
          <div
            key={product.name}
            className="flex items-center gap-3 animate-slide-up opacity-0"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
          >
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm",
              index === 0 && "bg-warning/20 text-warning",
              index === 1 && "bg-muted text-muted-foreground",
              index === 2 && "bg-accent/20 text-accent",
              index > 2 && "bg-secondary text-secondary-foreground"
            )}>
              #{index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{product.name}</p>
              <p className="text-xs text-muted-foreground">{product.units} units</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">₹{product.sales.toLocaleString('en-IN')}</p>
              <div className="flex items-center gap-1 text-xs text-success">
                <TrendingUp className="w-3 h-3" />
                <span>+12%</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

interface SlowProductsProps {
  products: Array<{
    name: string;
    daysSinceLastSale: number;
    stockValue: number;
  }>;
}

export function SlowProducts({ products }: SlowProductsProps) {
  return (
    <Card className="border-l-4 border-l-warning">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Slow Moving Stock</CardTitle>
          <Badge variant="warning">Action Needed</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {products.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Great! No slow-moving products detected.
          </p>
        ) : (
          products.map((product, index) => (
            <div
              key={product.name}
              className="flex items-center gap-3 p-3 rounded-lg bg-warning/5 animate-slide-up opacity-0"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{product.name}</p>
                <p className="text-xs text-warning">
                  No sale in {product.daysSinceLastSale} days
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">₹{product.stockValue.toLocaleString('en-IN')}</p>
                <p className="text-xs text-muted-foreground">stock value</p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
