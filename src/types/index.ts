// Core Types for AI Inventory Platform

export interface Store {
  id: string;
  name: string;
  type: 'kirana' | 'medical' | 'wholesale';
  ownerId: string;
  address: string;
  phone: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  nameHindi?: string;
  parentId?: string;
  storeId: string;
  icon?: string;
}

export interface Product {
  id: string;
  name: string;
  nameHindi?: string;
  categoryId: string;
  storeId: string;
  sku?: string;
  barcode?: string;
  baseUnit: 'kg' | 'g' | 'pcs' | 'strip' | 'bottle' | 'box' | 'packet' | 'litre' | 'ml';
  minStock: number;
  createdAt: Date;
}

export interface Variant {
  id: string;
  productId: string;
  name: string;
  size?: string;
  batchNumber?: string;
  expiryDate?: Date;
  costPrice: number;
  sellingPrice: number;
  mrp: number;
  quantity: number;
  unit: string;
}

export interface Sale {
  id: string;
  storeId: string;
  items: SaleItem[];
  totalAmount: number;
  discount?: number;
  paymentMethod: 'cash' | 'upi' | 'card' | 'credit';
  customerId?: string;
  createdAt: Date;
}

export interface SaleItem {
  variantId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Alert {
  id: string;
  storeId: string;
  type: 'low_stock' | 'out_of_stock' | 'expiry_near' | 'expired' | 'dead_stock';
  productId: string;
  variantId?: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  isRead: boolean;
  createdAt: Date;
}

export interface AIInsight {
  id: string;
  storeId: string;
  type: 'demand_prediction' | 'reorder_suggestion' | 'dead_stock' | 'trend_analysis';
  productId?: string;
  title: string;
  description: string;
  confidence: number;
  data: Record<string, unknown>;
  createdAt: Date;
}

export interface Subscription {
  id: string;
  storeId: string;
  plan: 'free' | 'pro' | 'business';
  status: 'active' | 'cancelled' | 'expired';
  razorpaySubscriptionId?: string;
  startDate: Date;
  endDate: Date;
}
