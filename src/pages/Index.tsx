import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { AlertsList } from '@/components/dashboard/AlertsList';
import { AIInsightsPanel } from '@/components/dashboard/AIInsightsPanel';
import { SalesChart, CategoryChart } from '@/components/dashboard/Charts';
import { TopProducts } from '@/components/dashboard/ProductLists';
import { 
  mockAlerts, 
  mockAIInsights, 
  mockSalesData, 
  mockTopProducts, 
  mockChartData, 
  mockCategoryDistribution,
  mockProducts 
} from '@/data/mockData';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const unreadAlerts = mockAlerts.filter(a => !a.isRead).length;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        alertCount={unreadAlerts} 
      />
      
      <main className="pl-20 lg:pl-64 min-h-screen">
        <Header 
          title="Dashboard" 
          subtitle="Welcome back! Here's your store overview."
          alertCount={unreadAlerts}
          onNewSale={() => console.log('New sale')}
        />
        
        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <StatsGrid 
            salesData={mockSalesData}
            totalProducts={mockProducts.length}
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
        </div>
      </main>
    </div>
  );
};

export default Index;
