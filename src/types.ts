export type ProductCategory = 
  | 'Kaos DTF'
  | 'Sticker'
  | 'Brosur & Print'
  | 'Packaging'
  | 'Merchandise'
  | 'Jasa Desain'
  | 'Logo & Branding';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  basePrice: number;
  unit: string; // e.g. "pcs", "lembar A3+", "project"
  minOrder: number;
  imageUrl: string;
  materials: string[];
  sizes: string[];
  leadTime: string;
  isPopular?: boolean;
  active: boolean;
  salesCount: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  category: ProductCategory;
  material: string;
  size: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
  customNotes?: string;
  uploadedDesignUrl?: string;
}

export type PaymentMethod = 'qris' | 'bca' | 'mandiri' | 'gopay' | 'dana';

export type PaymentStatus = 'PENDING' | 'PAID' | 'VERIFYING';

export type OrderStatus = 
  | 'PENDING' 
  | 'CONFIRMED' 
  | 'IN_PRODUCTION' 
  | 'SHIPPED' 
  | 'COMPLETED' 
  | 'CANCELLED';

export interface WANotificationLog {
  id: string;
  timestamp: string;
  message: string;
  type: 'ORDER_CREATED' | 'PAYMENT_RECEIVED' | 'IN_PRODUCTION' | 'SHIPPED' | 'COMPLETED';
  sentTo: string;
  status: 'SENT' | 'PENDING' | 'FAILED';
}

export interface Order {
  id: string; // e.g. "EA-98214"
  createdAt: string; // ISO String
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  paymentProofUrl?: string;
  waNotificationSent: boolean;
  waLogs: WANotificationLog[];
  adminNotes?: string;
}

export interface DailyVisit {
  date: string; // "YYYY-MM-DD"
  visits: number;
  uniqueVisitors: number;
  pageViews: number;
}

export interface DailySale {
  date: string; // "YYYY-MM-DD"
  revenue: number;
  ordersCount: number;
}

export interface WeeklyEmailReport {
  id: string;
  period: string; // e.g., "18 Jul - 24 Jul 2026"
  sentAt: string;
  recipientEmail: string;
  totalRevenue: number;
  totalOrders: number;
  totalVisitors: number;
  avgOrderValue: number;
  topProducts: { name: string; category: string; count: number; revenue: number }[];
  status: 'DELIVERED' | 'SCHEDULED' | 'FAILED';
  summaryNote: string;
}

export interface VisitorInfo {
  totalVisitorsToday: number;
  activeOnlineUsers: number;
  totalAllTimeVisits: number;
}
