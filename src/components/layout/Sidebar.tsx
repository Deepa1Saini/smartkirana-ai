import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Bell, 
  Sparkles, 
  Settings, 
  LogOut,
  ChevronLeft,
  Store,
  TrendingUp
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  alertCount: number;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', labelHindi: 'डैशबोर्ड', icon: LayoutDashboard },
  { id: 'inventory', label: 'Inventory', labelHindi: 'इन्वेंटरी', icon: Package },
  { id: 'sales', label: 'Sales', labelHindi: 'बिक्री', icon: ShoppingCart },
  { id: 'alerts', label: 'Alerts', labelHindi: 'अलर्ट', icon: Bell, hasBadge: true },
  { id: 'ai-insights', label: 'AI Insights', labelHindi: 'AI सुझाव', icon: Sparkles },
  { id: 'analytics', label: 'Analytics', labelHindi: 'विश्लेषण', icon: TrendingUp },
];

export function Sidebar({ activeTab, onTabChange, alertCount }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center w-full")}>
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <Store className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="font-bold text-foreground">StockSense</h1>
              <p className="text-xs text-muted-foreground">AI Inventory</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn("shrink-0", collapsed && "absolute -right-3 top-6 w-6 h-6 rounded-full bg-card border shadow-soft")}
        >
          <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
              activeTab === item.id
                ? "bg-primary text-primary-foreground shadow-soft"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <item.icon className={cn("w-5 h-5 shrink-0", activeTab === item.id && "animate-scale-in")} />
            {!collapsed && (
              <span className="font-medium animate-fade-in">{item.label}</span>
            )}
            {item.hasBadge && alertCount > 0 && (
              <Badge
                variant="critical"
                className={cn(
                  "ml-auto animate-pulse-soft",
                  collapsed && "absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-[10px]"
                )}
              >
                {alertCount}
              </Badge>
            )}
            {collapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                {item.label}
              </div>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border space-y-1">
        <button
          onClick={() => onTabChange('settings')}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
            activeTab === 'settings'
              ? "bg-secondary text-foreground"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          )}
        >
          <Settings className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="font-medium">Settings</span>}
        </button>
        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-destructive hover:bg-destructive/10 transition-all duration-200"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
