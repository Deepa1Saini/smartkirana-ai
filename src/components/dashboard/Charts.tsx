import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SalesChartProps {
  data: Array<{
    day: string;
    sales: number;
    orders: number;
  }>;
}

export function SalesChart({ data }: SalesChartProps) {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Weekly performance</CardDescription>
          </div>
          <Tabs defaultValue="sales" className="w-auto">
            <TabsList className="h-8">
              <TabsTrigger value="sales" className="text-xs px-3 h-6">Sales</TabsTrigger>
              <TabsTrigger value="orders" className="text-xs px-3 h-6">Orders</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(234, 89%, 54%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(234, 89%, 54%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" vertical={false} />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: 'hsl(220, 9%, 46%)' }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: 'hsl(220, 9%, 46%)' }}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(0, 0%, 100%)',
                  border: '1px solid hsl(220, 13%, 91%)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
                formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Sales']}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="hsl(234, 89%, 54%)"
                strokeWidth={2}
                fill="url(#salesGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

interface CategoryChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export function CategoryChart({ data }: CategoryChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Distribution</CardTitle>
        <CardDescription>Sales by category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(0, 0%, 100%)',
                  border: '1px solid hsl(220, 13%, 91%)',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`${value}%`, 'Share']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {data.slice(0, 4).map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full shrink-0" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-muted-foreground truncate">{item.name}</span>
              <span className="text-xs font-medium ml-auto">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
