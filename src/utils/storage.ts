import { Product, Order, DailyVisit, DailySale, WeeklyEmailReport, VisitorInfo } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_DAILY_VISITS, INITIAL_DAILY_SALES, INITIAL_WEEKLY_REPORTS } from '../data/initialData';

const KEYS = {
  PRODUCTS: 'ea_products_v1',
  ORDERS: 'ea_orders_v1',
  DAILY_VISITS: 'ea_daily_visits_v1',
  DAILY_SALES: 'ea_daily_sales_v1',
  WEEKLY_REPORTS: 'ea_weekly_reports_v1',
  VISITOR_INFO: 'ea_visitor_info_v1',
};

// Helper for safe JSON parse
function getStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
}

function setStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage:`, err);
  }
}

// Product Storage
export function getProducts(): Product[] {
  const products = getStorage<Product[] | null>(KEYS.PRODUCTS, null);
  return Array.isArray(products) && products.length > 0 ? products : INITIAL_PRODUCTS;
}

export function saveProducts(products: Product[]): void {
  setStorage(KEYS.PRODUCTS, products);
}

export function saveProduct(product: Product): Product[] {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === product.id);
  let updated: Product[];
  if (index >= 0) {
    updated = [...products];
    updated[index] = product;
  } else {
    updated = [product, ...products];
  }
  saveProducts(updated);
  return updated;
}

export function deleteProduct(productId: string): Product[] {
  const products = getProducts().filter((p) => p.id !== productId);
  saveProducts(products);
  return products;
}

// Order Storage
export function getOrders(): Order[] {
  const orders = getStorage<Order[] | null>(KEYS.ORDERS, null);
  return Array.isArray(orders) ? orders : INITIAL_ORDERS;
}

export function saveOrders(orders: Order[]): void {
  setStorage(KEYS.ORDERS, orders);
}

export function createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'waNotificationSent' | 'waLogs'>): Order {
  const orders = getOrders();
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const newOrder: Order = {
    ...orderData,
    id: `EA-${randomNum}`,
    createdAt: new Date().toISOString(),
    waNotificationSent: false,
    waLogs: [],
  };

  const updatedOrders = [newOrder, ...orders];
  saveOrders(updatedOrders);

  // Update sales analytics for today
  recordSale(newOrder.totalAmount);

  return newOrder;
}

export function updateOrderStatus(orderId: string, status: Order['orderStatus'], adminNotes?: string): Order[] {
  const orders = getOrders();
  const updated = orders.map((ord) => {
    if (ord.id === orderId) {
      const isPaid = status === 'CONFIRMED' || status === 'IN_PRODUCTION' || status === 'SHIPPED' || status === 'COMPLETED';
      return {
        ...ord,
        orderStatus: status,
        paymentStatus: isPaid ? ('PAID' as const) : ord.paymentStatus,
        adminNotes: adminNotes !== undefined ? adminNotes : ord.adminNotes,
      };
    }
    return ord;
  });
  saveOrders(updated);
  return updated;
}

// Visitor & Traffic Counter
export function trackDailyVisit(): VisitorInfo {
  const todayStr = new Date().toISOString().split('T')[0];
  const visitsList = getStorage<DailyVisit[]>(KEYS.DAILY_VISITS, INITIAL_DAILY_VISITS);

  let todayEntry = visitsList.find((v) => v.date === todayStr);
  let updatedList: DailyVisit[];

  if (todayEntry) {
    todayEntry = {
      ...todayEntry,
      visits: todayEntry.visits + 1,
      pageViews: todayEntry.pageViews + 1,
    };
    updatedList = visitsList.map((v) => (v.date === todayStr ? todayEntry! : v));
  } else {
    todayEntry = {
      date: todayStr,
      visits: 1,
      uniqueVisitors: 1,
      pageViews: 1,
    };
    updatedList = [...visitsList, todayEntry];
  }
  setStorage(KEYS.DAILY_VISITS, updatedList);

  const totalToday = todayEntry.visits;
  const activeOnline = Math.floor(3 + Math.random() * 8);
  const totalAllTime = updatedList.reduce((acc, curr) => acc + curr.visits, 12450);

  const visitorInfo: VisitorInfo = {
    totalVisitorsToday: totalToday,
    activeOnlineUsers: activeOnline,
    totalAllTimeVisits: totalAllTime,
  };
  setStorage(KEYS.VISITOR_INFO, visitorInfo);
  return visitorInfo;
}

export function getVisitorInfo(): VisitorInfo {
  return getStorage<VisitorInfo>(KEYS.VISITOR_INFO, {
    totalVisitorsToday: 365,
    activeOnlineUsers: 6,
    totalAllTimeVisits: 14850,
  });
}

export function getDailyVisits(): DailyVisit[] {
  const visits = getStorage<DailyVisit[] | null>(KEYS.DAILY_VISITS, null);
  return Array.isArray(visits) && visits.length > 0 ? visits : INITIAL_DAILY_VISITS;
}

// Daily Sales Analytics
export function recordSale(amount: number): void {
  const todayStr = new Date().toISOString().split('T')[0];
  const salesList = getStorage<DailySale[]>(KEYS.DAILY_SALES, INITIAL_DAILY_SALES);

  const index = salesList.findIndex((s) => s.date === todayStr);
  let updatedList: DailySale[];

  if (index >= 0) {
    updatedList = [...salesList];
    updatedList[index] = {
      ...updatedList[index],
      revenue: updatedList[index].revenue + amount,
      ordersCount: updatedList[index].ordersCount + 1,
    };
  } else {
    updatedList = [...salesList, { date: todayStr, revenue: amount, ordersCount: 1 }];
  }
  setStorage(KEYS.DAILY_SALES, updatedList);
}

export function getDailySales(): DailySale[] {
  const sales = getStorage<DailySale[] | null>(KEYS.DAILY_SALES, null);
  return Array.isArray(sales) && sales.length > 0 ? sales : INITIAL_DAILY_SALES;
}

// Weekly Email Reports
export function getWeeklyReports(): WeeklyEmailReport[] {
  const reports = getStorage<WeeklyEmailReport[] | null>(KEYS.WEEKLY_REPORTS, null);
  return Array.isArray(reports) && reports.length > 0 ? reports : INITIAL_WEEKLY_REPORTS;
}

export function generateWeeklyReport(recipientEmail: string = 'digiwork.inc@gmail.com'): WeeklyEmailReport {
  const reports = getWeeklyReports();
  const sales = getDailySales();
  const visits = getDailyVisits();

  // Calculate totals for recent 7 days
  const totalRevenue = sales.reduce((sum, s) => sum + s.revenue, 0);
  const totalOrders = sales.reduce((sum, s) => sum + s.ordersCount, 0);
  const totalVisitors = visits.reduce((sum, v) => sum + v.visits, 0);
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  const now = new Date();
  const reportId = `report-${now.getTime()}`;
  const periodStr = `18 Jul - 24 Jul 2026`;

  const newReport: WeeklyEmailReport = {
    id: reportId,
    period: periodStr,
    sentAt: now.toISOString(),
    recipientEmail,
    totalRevenue,
    totalOrders,
    totalVisitors,
    avgOrderValue,
    topProducts: [
      { name: 'Sablon Kaos Custom DTF', category: 'Kaos DTF', count: 32, revenue: 2080000 },
      { name: 'Sticker Custom Vinyl Waterproof', category: 'Sticker', count: 24, revenue: 432000 },
      { name: 'Totebag & Mug Custom', category: 'Merchandise', count: 14, revenue: 490000 },
    ],
    status: 'DELIVERED',
    summaryNote: `Laporan Mingguan Otomatis dikirim ke ${recipientEmail}. Total Omzet periode ini adalah Rp ${totalRevenue.toLocaleString('id-ID')} dari ${totalOrders} transaksi dengan total ${totalVisitors} kunjungan web.`,
  };

  const updatedReports = [newReport, ...reports];
  setStorage(KEYS.WEEKLY_REPORTS, updatedReports);
  return newReport;
}

// Reset data to defaults
export function resetDataToDefault(): void {
  localStorage.removeItem(KEYS.PRODUCTS);
  localStorage.removeItem(KEYS.ORDERS);
  localStorage.removeItem(KEYS.DAILY_VISITS);
  localStorage.removeItem(KEYS.DAILY_SALES);
  localStorage.removeItem(KEYS.WEEKLY_REPORTS);
  localStorage.removeItem(KEYS.VISITOR_INFO);
}
