import { useState } from 'react';
import { Bell, Search, Plus, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { mockProductsWithVariants } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

interface HeaderProps {
  title: string;
  subtitle?: string;
  alertCount: number;
  onNewSale?: () => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
}

export function Header({ 
  title, 
  subtitle, 
  alertCount, 
  onNewSale,
  onNotificationClick,
  onProfileClick 
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const searchResults = searchQuery.length > 1
    ? mockProductsWithVariants.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSelect = (productName: string) => {
    toast({
      title: "Product Selected",
      description: `Navigating to ${productName}...`,
    });
    setSearchQuery('');
    setShowResults(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products, categories..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              className="pl-9 w-64 bg-secondary/50 border-0 focus-visible:ring-1"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6"
                onClick={() => {
                  setSearchQuery('');
                  setShowResults(false);
                }}
              >
                <X className="w-3 h-3" />
              </Button>
            )}
            
            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50">
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSearchSelect(product.name)}
                    className="w-full px-4 py-2 text-left hover:bg-secondary/50 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.sku}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {product.totalStock} {product.unit}
                    </Badge>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Sale */}
          {onNewSale && (
            <Button variant="gradient" onClick={onNewSale} className="hidden sm:flex">
              <Plus className="w-4 h-4" />
              New Sale
            </Button>
          )}

          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={onNotificationClick}
          >
            <Bell className="w-5 h-5" />
            {alertCount > 0 && (
              <Badge
                variant="critical"
                className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-[10px] animate-pulse-soft"
              >
                {alertCount}
              </Badge>
            )}
          </Button>

          {/* Profile */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={onProfileClick}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center">
              <User className="w-4 h-4 text-accent-foreground" />
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}
