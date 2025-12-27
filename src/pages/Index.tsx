import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { AlertsList } from '@/components/dashboard/AlertsList';
import { AIInsightsPanel } from '@/components/dashboard/AIInsightsPanel';
import { SalesChart, CategoryChart } from '@/components/dashboard/Charts';
import { TopProducts } from '@/components/dashboard/ProductLists';
import { InventoryView } from '@/components/views/InventoryView';
import { SalesView } from '@/components/views/SalesView';
import { AlertsView } from '@/components/views/AlertsView';
import { AIInsightsView } from '@/components/views/AIInsightsView';
import { AnalyticsView } from '@/components/views/AnalyticsView';
import { SettingsView } from '@/components/views/SettingsView';
import { 
  mockAlerts, 
  mockAIInsights, 
  mockSalesData, 
  mockTopProducts, 
  mockChartData, 
  mockCategoryDistribution,
  mockProductsWithVariants 
} from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

const tabTitles: Record<string, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Welcome back! Here\'s your store overview.' },
  inventory: { title: 'Inventory', subtitle: 'Manage your products and stock levels.' },
  sales: { title: 'New Sale', subtitle: 'Create a new sale transaction.' },
  alerts: { title: 'Alerts', subtitle: 'View and manage all notifications.' },
  'ai-insights': { title: 'AI Insights', subtitle: 'Smart recommendations for your business.' },
  analytics: { title: 'Analytics', subtitle: 'Detailed reports and statistics.' },
  settings: { title: 'Settings', subtitle: 'Configure your store preferences.' },
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const unreadAlerts = mockAlerts.filter(a => !a.isRead).length;

  const currentTabInfo = tabTitles[activeTab] || tabTitles.dashboard;

  const handleNewSale = () => {
    setActiveTab('sales');
    toast({
      title: "New Sale",
      description: "Starting a new sale transaction...",
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'inventory':
        return <InventoryView />;
      case 'sales':
        return <SalesView />;
      case 'alerts':
        return <AlertsView />;
      case 'ai-insights':
        return <AIInsightsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'settings':
        return <SettingsView />;
      case 'dashboard':
      default:
        return (
          <>
            {/* Stats Grid */}
            <StatsGrid 
              salesData={mockSalesData}
              totalProducts={mockProductsWithVariants.length}
              lowStockCount={3}
              totalOrders={45}
            />

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <SalesChart data={mockChartData} />
              <CategoryChart data={mockCategoryDistribution} />
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AIInsightsPanel insights={mockAIInsights} />
              </div>
              <AlertsList alerts={mockAlerts} />
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TopProducts products={mockTopProducts} />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        alertCount={unreadAlerts} 
      />
      
      <main className="pl-20 lg:pl-64 min-h-screen">
        <Header 
          title={currentTabInfo.title}
          subtitle={currentTabInfo.subtitle}
          alertCount={unreadAlerts}
          onNewSale={handleNewSale}
          onNotificationClick={() => setActiveTab('alerts')}
          onProfileClick={() => setActiveTab('settings')}
        />
        
        <div className="p-6 space-y-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
