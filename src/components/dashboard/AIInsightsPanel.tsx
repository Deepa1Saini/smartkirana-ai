import { Sparkles, TrendingUp, Package, AlertCircle, ChevronRight, Lightbulb } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AIInsight } from '@/types';
import { cn } from '@/lib/utils';

interface AIInsightsProps {
  insights: AIInsight[];
  maxItems?: number;
  onViewAll?: () => void;
}

const insightIcons = {
  demand_prediction: TrendingUp,
  reorder_suggestion: Package,
  dead_stock: AlertCircle,
  trend_analysis: Lightbulb,
};

const insightColors = {
  demand_prediction: 'from-success/20 to-transparent border-success/30',
  reorder_suggestion: 'from-warning/20 to-transparent border-warning/30',
  dead_stock: 'from-destructive/20 to-transparent border-destructive/30',
  trend_analysis: 'from-info/20 to-transparent border-info/30',
};

export function AIInsightsPanel({ insights, maxItems = 3, onViewAll }: AIInsightsProps) {
  const displayedInsights = insights.slice(0, maxItems);

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-lg">AI Insights</CardTitle>
              <p className="text-xs text-muted-foreground">Smart suggestions for your store</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onViewAll} className="text-primary">
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {displayedInsights.map((insight, index) => {
          const Icon = insightIcons[insight.type];
          return (
            <div
              key={insight.id}
              className={cn(
                "relative p-4 rounded-xl border bg-gradient-to-br cursor-pointer hover:shadow-medium transition-all duration-200 animate-slide-up opacity-0",
                insightColors[insight.type]
              )}
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                  insight.type === 'demand_prediction' && "bg-success/20",
                  insight.type === 'reorder_suggestion' && "bg-warning/20",
                  insight.type === 'dead_stock' && "bg-destructive/20",
                  insight.type === 'trend_analysis' && "bg-info/20"
                )}>
                  <Icon className={cn(
                    "w-5 h-5",
                    insight.type === 'demand_prediction' && "text-success",
                    insight.type === 'reorder_suggestion' && "text-warning",
                    insight.type === 'dead_stock' && "text-destructive",
                    insight.type === 'trend_analysis' && "text-info"
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm">{insight.title}</h4>
                    <Badge variant="ai" className="text-[10px] px-1.5 py-0">
                      {Math.round(insight.confidence * 100)}% confident
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                  
                  {/* Confidence Bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>AI Confidence</span>
                      <span>{Math.round(insight.confidence * 100)}%</span>
                    </div>
                    <Progress value={insight.confidence * 100} className="h-1.5" />
                  </div>
                </div>
              </div>
              
              {/* Action Button */}
              <div className="mt-3 flex justify-end">
                <Button size="sm" variant="secondary" className="text-xs">
                  Take Action
                  <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
