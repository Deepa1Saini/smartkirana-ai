import { Sparkles, TrendingUp, Package, AlertTriangle, Lightbulb, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockAIInsights } from '@/data/mockData';
import { cn } from '@/lib/utils';

export function AIInsightsView() {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'reorder_suggestion':
        return <Package className="w-5 h-5" />;
      case 'trend_analysis':
        return <TrendingUp className="w-5 h-5" />;
      case 'dead_stock':
        return <AlertTriangle className="w-5 h-5" />;
      case 'demand_prediction':
        return <Lightbulb className="w-5 h-5" />;
      default:
        return <Lightbulb className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-ai" />
            AI-Powered Insights
          </h2>
          <p className="text-muted-foreground">Smart recommendations based on your store data</p>
        </div>
        <Button variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Insights
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card variant="ai">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-ai">{mockAIInsights.length}</p>
              <p className="text-sm text-muted-foreground">Active Insights</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-success">₹12,500</p>
              <p className="text-sm text-muted-foreground">Potential Savings</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">87%</p>
              <p className="text-sm text-muted-foreground">Avg. Confidence</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {mockAIInsights.map((insight) => (
          <Card 
            key={insight.id} 
            className={cn(
              "transition-all hover:shadow-lg",
              insight.priority === 'high' && "border-ai/50"
            )}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    insight.type === 'reorder_suggestion' && "bg-primary/10 text-primary",
                    insight.type === 'trend_analysis' && "bg-success/10 text-success",
                    insight.type === 'dead_stock' && "bg-warning/10 text-warning",
                    insight.type === 'demand_prediction' && "bg-info/10 text-info"
                  )}>
                    {getInsightIcon(insight.type)}
                  </div>
                  <div>
                    <CardTitle className="text-base">{insight.title}</CardTitle>
                    <CardDescription className="mt-1">{insight.description}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <Badge variant="ai" className="text-xs">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {insight.confidence}% confidence
                  </Badge>
                  <Badge 
                    variant={insight.priority === 'high' ? 'critical' : insight.priority === 'medium' ? 'warning' : 'secondary'}
                    className="text-xs"
                  >
                    {insight.priority} priority
                  </Badge>
                </div>
              </div>
              {insight.suggestedAction && (
                <div className="mt-4 p-3 rounded-lg bg-secondary/50">
                  <p className="text-sm font-medium mb-2">Suggested Action:</p>
                  <p className="text-sm text-muted-foreground">{insight.suggestedAction}</p>
                  <Button variant="gradient" size="sm" className="mt-3">
                    Apply Suggestion
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Explanation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-ai" />
            How AI Insights Work
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-1">Data Analysis</h4>
              <p className="text-sm text-muted-foreground">We analyze your sales history, stock levels, and seasonal patterns</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-ai/10 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-ai" />
              </div>
              <h4 className="font-semibold mb-1">AI Processing</h4>
              <p className="text-sm text-muted-foreground">Machine learning models predict demand and identify opportunities</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <h4 className="font-semibold mb-1">Smart Suggestions</h4>
              <p className="text-sm text-muted-foreground">Get actionable recommendations to grow your business</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
