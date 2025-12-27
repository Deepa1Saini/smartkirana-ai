// Mock data for the demo
import { Category, Product, Variant, Alert, AIInsight, Sale } from '@/types';

export const mockCategories: Category[] = [
  { id: '1', name: 'Grocery', nameHindi: 'किराना', storeId: 'store1', icon: '🛒' },
  { id: '2', name: 'Dairy', nameHindi: 'डेयरी', storeId: 'store1', icon: '🥛', parentId: '1' },
  { id: '3', name: 'Snacks', nameHindi: 'नाश्ता', storeId: 'store1', icon: '🍪', parentId: '1' },
  { id: '4', name: 'Beverages', nameHindi: 'पेय पदार्थ', storeId: 'store1', icon: '🥤', parentId: '1' },
  { id: '5', name: 'Personal Care', nameHindi: 'पर्सनल केयर', storeId: 'store1', icon: '🧴' },
  { id: '6', name: 'Medicines', nameHindi: 'दवाइयां', storeId: 'store1', icon: '💊' },
  { id: '7', name: 'Pain Relief', nameHindi: 'दर्द निवारक', storeId: 'store1', icon: '💉', parentId: '6' },
  { id: '8', name: 'Antibiotics', nameHindi: 'एंटीबायोटिक', storeId: 'store1', icon: '💊', parentId: '6' },
];

export const mockProducts: Product[] = [
  { id: 'p1', name: 'Amul Butter', nameHindi: 'अमूल मक्खन', categoryId: '2', storeId: 'store1', sku: 'AMB001', barcode: '8901030000001', baseUnit: 'pcs', minStock: 10, createdAt: new Date() },
  { id: 'p2', name: 'Parle-G Biscuit', nameHindi: 'पारले-जी बिस्किट', categoryId: '3', storeId: 'store1', sku: 'PLG001', barcode: '8901030000002', baseUnit: 'packet', minStock: 20, createdAt: new Date() },
  { id: 'p3', name: 'Coca Cola', nameHindi: 'कोका कोला', categoryId: '4', storeId: 'store1', sku: 'CCL001', barcode: '8901030000003', baseUnit: 'bottle', minStock: 15, createdAt: new Date() },
  { id: 'p4', name: 'Paracetamol 500mg', nameHindi: 'पेरासिटामोल', categoryId: '7', storeId: 'store1', sku: 'PCM500', barcode: '8901030000004', baseUnit: 'strip', minStock: 50, createdAt: new Date() },
  { id: 'p5', name: 'Amoxicillin 250mg', nameHindi: 'एमोक्सिसिलिन', categoryId: '8', storeId: 'store1', sku: 'AMX250', barcode: '8901030000005', baseUnit: 'strip', minStock: 30, createdAt: new Date() },
  { id: 'p6', name: 'Tata Salt', nameHindi: 'टाटा नमक', categoryId: '1', storeId: 'store1', sku: 'TST001', barcode: '8901030000006', baseUnit: 'kg', minStock: 25, createdAt: new Date() },
];

export const mockVariants: Variant[] = [
  { id: 'v1', productId: 'p1', name: '100g Pack', size: '100g', costPrice: 45, sellingPrice: 52, mrp: 55, quantity: 45, unit: 'pcs' },
  { id: 'v2', productId: 'p1', name: '500g Pack', size: '500g', costPrice: 220, sellingPrice: 255, mrp: 265, quantity: 8, unit: 'pcs' },
  { id: 'v3', productId: 'p2', name: 'Regular 80g', size: '80g', costPrice: 8, sellingPrice: 10, mrp: 10, quantity: 150, unit: 'packet' },
  { id: 'v4', productId: 'p3', name: '250ml', size: '250ml', costPrice: 18, sellingPrice: 20, mrp: 20, quantity: 3, unit: 'bottle' },
  { id: 'v5', productId: 'p3', name: '2L', size: '2L', costPrice: 80, sellingPrice: 90, mrp: 95, quantity: 12, unit: 'bottle' },
  { id: 'v6', productId: 'p4', name: 'Strip of 10', size: '10 tablets', batchNumber: 'PCM2024A', expiryDate: new Date('2025-06-15'), costPrice: 18, sellingPrice: 25, mrp: 28, quantity: 5, unit: 'strip' },
  { id: 'v7', productId: 'p4', name: 'Strip of 15', size: '15 tablets', batchNumber: 'PCM2024B', expiryDate: new Date('2025-08-20'), costPrice: 25, sellingPrice: 35, mrp: 40, quantity: 85, unit: 'strip' },
  { id: 'v8', productId: 'p5', name: 'Strip of 10', size: '10 capsules', batchNumber: 'AMX2024A', expiryDate: new Date('2025-03-10'), costPrice: 45, sellingPrice: 65, mrp: 75, quantity: 42, unit: 'strip' },
  { id: 'v9', productId: 'p6', name: '1kg Pack', size: '1kg', costPrice: 22, sellingPrice: 26, mrp: 28, quantity: 0, unit: 'kg' },
];

export const mockAlerts: Alert[] = [
  { id: 'a1', storeId: 'store1', type: 'out_of_stock', productId: 'p6', title: 'Out of Stock', message: 'Tata Salt (1kg) is out of stock!', severity: 'critical', isRead: false, createdAt: new Date() },
  { id: 'a2', storeId: 'store1', type: 'low_stock', productId: 'p3', variantId: 'v4', title: 'Low Stock Warning', message: 'Coca Cola 250ml low stock (3 units)', severity: 'high', isRead: false, createdAt: new Date() },
  { id: 'a3', storeId: 'store1', type: 'expiry_near', productId: 'p5', variantId: 'v8', title: 'Expiry Alert', message: 'Amoxicillin batch AMX2024A expires in 75 days', severity: 'medium', isRead: false, createdAt: new Date() },
  { id: 'a4', storeId: 'store1', type: 'low_stock', productId: 'p4', variantId: 'v6', title: 'Low Stock', message: 'Paracetamol 500mg (10 tab) low stock', severity: 'high', isRead: true, createdAt: new Date() },
  { id: 'a5', storeId: 'store1', type: 'low_stock', productId: 'p1', variantId: 'v2', title: 'Stock Running Low', message: 'Amul Butter 500g running low (8 units)', severity: 'medium', isRead: true, createdAt: new Date() },
];

export const mockAIInsights: AIInsight[] = [
  {
    id: 'ai1',
    storeId: 'store1',
    type: 'demand_prediction',
    productId: 'p2',
    title: 'Parle-G demand spike expected',
    description: 'Based on festival season trends, expect 40% higher sales next week. Current stock: 150 units. Recommended: Order 100 more.',
    confidence: 87,
    priority: 'high',
    suggestedAction: 'Order 100 more units of Parle-G before the weekend rush',
    data: { predictedSales: 210, currentStock: 150, recommendedOrder: 100 },
    createdAt: new Date(),
  },
  {
    id: 'ai2',
    storeId: 'store1',
    type: 'reorder_suggestion',
    productId: 'p3',
    title: 'Reorder Coca Cola 250ml',
    description: 'Stock will run out in 2 days based on current sales velocity (5/day). Weekend approaching - higher demand expected.',
    confidence: 92,
    priority: 'high',
    suggestedAction: 'Place order for 48 units of Coca Cola 250ml immediately',
    data: { daysUntilStockout: 2, avgDailySales: 5, suggestedQuantity: 48 },
    createdAt: new Date(),
  },
  {
    id: 'ai3',
    storeId: 'store1',
    type: 'dead_stock',
    productId: 'p1',
    title: 'Slow moving: Amul Butter 500g',
    description: 'No sales in last 12 days. Consider promotional discount or bundle with other products.',
    confidence: 78,
    priority: 'medium',
    suggestedAction: 'Create a 10% discount offer or bundle with bread',
    data: { daysSinceLastSale: 12, stockValue: 2040 },
    createdAt: new Date(),
  },
];

export const mockSalesData = {
  today: 12450,
  yesterday: 10890,
  thisWeek: 78500,
  thisMonth: 324000,
  totalSales: 324000,
  growth: 14.3,
};

// Products with variant data combined for easy display
export const mockProductsWithVariants = mockProducts.map((product) => {
  const variants = mockVariants.filter(v => v.productId === product.id);
  const totalStock = variants.reduce((sum, v) => sum + v.quantity, 0);
  const firstVariant = variants[0];
  return {
    ...product,
    sku: product.sku || '',
    totalStock,
    sellingPrice: firstVariant?.sellingPrice || 0,
    mrp: firstVariant?.mrp || 0,
    unit: firstVariant?.unit || product.baseUnit,
  };
});

export const mockTopProducts = [
  { name: 'Parle-G Biscuit', sales: 2450, units: 245 },
  { name: 'Coca Cola 250ml', sales: 1800, units: 90 },
  { name: 'Amul Butter 100g', sales: 1560, units: 30 },
  { name: 'Paracetamol 500mg', sales: 1250, units: 50 },
  { name: 'Tata Salt 1kg', sales: 1040, units: 40 },
];

export const mockChartData = [
  { day: 'Mon', sales: 8500, orders: 45 },
  { day: 'Tue', sales: 9200, orders: 52 },
  { day: 'Wed', sales: 7800, orders: 38 },
  { day: 'Thu', sales: 10500, orders: 58 },
  { day: 'Fri', sales: 12800, orders: 72 },
  { day: 'Sat', sales: 15200, orders: 85 },
  { day: 'Sun', sales: 14500, orders: 78 },
];

export const mockCategoryDistribution = [
  { name: 'Grocery', value: 45, color: 'hsl(234, 89%, 54%)' },
  { name: 'Dairy', value: 20, color: 'hsl(142, 71%, 45%)' },
  { name: 'Medicines', value: 18, color: 'hsl(24, 95%, 53%)' },
  { name: 'Snacks', value: 12, color: 'hsl(199, 89%, 48%)' },
  { name: 'Others', value: 5, color: 'hsl(220, 9%, 46%)' },
];
