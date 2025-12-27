import { TrendingUp, TrendingDown, DollarSign, Package, ShoppingCart, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SalesChart, CategoryChart } from '@/components/dashboard/Charts';
import { mockChartData, mockCategoryDistribution, mockSalesData } from '@/data/mockData';

export function AnalyticsView() {
  const stats = [
    {
      title: 'Total Revenue',
      value: `₹${mockSalesData.totalSales.toLocaleString()}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
    },
    {
      title: 'Avg. Order Value',
      value: '₹485',
      change: '-2.1%',
      trend: 'down',
      icon: TrendingUp,
    },
    {
      title: 'Active Products',
      value: '456',
      change: '+5',
      trend: 'up',
      icon: Package,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <div className={`flex items-center gap-1 mt-1 text-sm ${
                    stat.trend === 'up' ? 'text-success' : 'text-destructive'
                  }`}>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-secondary">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SalesChart data={mockChartData} />
        <CategoryChart data={mockCategoryDistribution} />
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCategoryDistribution.map((cat, i) => (
                <div key={cat.name} className="flex items-center gap-4">
                  <span className="text-lg font-bold text-muted-foreground w-6">#{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{cat.name}</span>
                      <span className="text-sm text-muted-foreground">{cat.value}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${cat.value}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Day</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, i) => {
                const value = 40 + Math.random() * 60;
                return (
                  <div key={day} className="flex items-center gap-4">
                    <span className="text-sm w-20">{day}</span>
                    <div className="flex-1 h-6 bg-secondary rounded overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-accent rounded transition-all"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-12 text-right">{Math.round(value)}%</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
