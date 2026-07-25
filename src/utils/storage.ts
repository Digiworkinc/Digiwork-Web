import { Product, Order, DailyVisit, DailySale, WeeklyEmailReport, VisitorInfo } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_DAILY_VISITS, INITIAL_DAILY_SALES, INITIAL_WEEKLY_REPORTS } from '../data/initialData';
import { db, isFirebaseConfigured } from '../lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';

const API_BASE_URL = 'http://localhost:8080/api'; // URL backend kita

const KEYS = {
  PRODUCTS: 'ea_products_v1',
  ORDERS: 'ea_orders_v1',
  DAILY_VISITS: 'ea_daily_visits_v1',
  DAILY_SALES: 'ea_daily_sales_v1',
  WEEKLY_REPORTS: 'ea_weekly_reports_v1',
  VISITOR_INFO: 'ea_visitor_info_v1',
};

/*
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
*/

// Product Storage
export async function getProducts(): Promise<Product[]> {
  if (db && isFirebaseConfigured) {
    try {
      const snapshot = await getDocs(query(collection(db, 'products'), orderBy('name')));
      return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() } as Product));
    } catch (error) {
      console.error('Failed to fetch products from Firestore:', error);
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return INITIAL_PRODUCTS;
  }
}

// Fungsi ini tidak lagi relevan karena setiap produk disimpan satu per satu
// export function saveProducts(products: Product[]): void {
//   // setStorage(KEYS.PRODUCTS, products);
// }

export async function saveProduct(product: Product): Promise<Product> {
  if (db && isFirebaseConfigured) {
    try {
      const docRef = await addDoc(collection(db, 'products'), product);
      return { ...product, id: docRef.id };
    } catch (error) {
      console.error('Error saving product to Firestore:', error);
      throw error;
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Failed to save product');
    }
    return await response.json();
  } catch (error) {
    console.error('Error saving product:', error);
    throw error;
  }
}

export async function deleteProduct(productId: string): Promise<void> {
  if (db && isFirebaseConfigured) {
    try {
      await deleteDoc(doc(db, 'products', productId));
      return;
    } catch (error) {
      console.error('Error deleting product from Firestore:', error);
      throw error;
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

// Order Storage
export async function getOrders(): Promise<Order[]> {
  if (db && isFirebaseConfigured) {
    try {
      const snapshot = await getDocs(query(collection(db, 'orders'), orderBy('createdAt', 'desc')));
      return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() } as Order));
    } catch (error) {
      console.error('Failed to fetch orders from Firestore:', error);
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/orders`);
    if (!response.ok) {
      throw new Error('Network response was not ok for getting orders');
    }
    const orders = await response.json();
    return orders;
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return INITIAL_ORDERS;
  }
}

export async function createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'waNotificationSent' | 'waLogs'>): Promise<Order> {
  if (db && isFirebaseConfigured) {
    try {
      const payload = {
        ...orderData,
        createdAt: new Date().toISOString(),
        waNotificationSent: false,
        waLogs: [],
      };
      const docRef = await addDoc(collection(db, 'orders'), payload);
      const newOrder = { id: docRef.id, ...payload } as Order;
      recordSale(newOrder.totalAmount);
      return newOrder;
    } catch (error) {
      console.error('Error creating order in Firestore:', error);
      throw error;
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    const newOrder = await response.json();
    recordSale(newOrder.totalAmount);
    return newOrder;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

export async function updateOrderStatus(orderId: string, status: Order['orderStatus'], adminNotes?: string): Promise<Order> {
  if (db && isFirebaseConfigured) {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { orderStatus: status, adminNotes });
      return { id: orderId, orderStatus: status, adminNotes } as Order;
    } catch (error) {
      console.error('Error updating order status in Firestore:', error);
      throw error;
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status, adminNotes }),
    });
    if (!response.ok) {
      throw new Error('Failed to update order status');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}

// Visitor & Traffic Counter
export function trackDailyVisit(): VisitorInfo {
  // Fungsi-fungsi analytics (visitor, sales, reports) masih menggunakan localStorage
  // dan belum dimigrasikan karena memerlukan arsitektur yang lebih kompleks.
  /*const todayStr = new Date().toISOString().split('T')[0];
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
  return visitorInfo;*/
  // NOTE: Fungsi ini sangat bergantung pada localStorage dan sulit dimigrasikan
  // ke backend tanpa sistem otentikasi/session yang kompleks.
  // Untuk sementara, kita kembalikan data statis.
  return getVisitorInfo();
}

export function getVisitorInfo(): VisitorInfo {
  const info = JSON.parse(localStorage.getItem(KEYS.VISITOR_INFO) || 'null');
  return info || {
    totalVisitorsToday: 365,
    activeOnlineUsers: 6,
    totalAllTimeVisits: 14850,
  };
}

export function getDailyVisits(): DailyVisit[] {
  const visits = JSON.parse(localStorage.getItem(KEYS.DAILY_VISITS) || 'null');
  return Array.isArray(visits) && visits.length > 0 ? visits : INITIAL_DAILY_VISITS;
}

// Daily Sales Analytics
export function recordSale(amount: number): void {
  const todayStr = new Date().toISOString().split('T')[0];
  const salesList = JSON.parse(localStorage.getItem(KEYS.DAILY_SALES) || 'null') || INITIAL_DAILY_SALES;

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
  // Fungsi setStorage sudah dikomentari, gunakan localStorage.setItem langsung
  try {
    localStorage.setItem(KEYS.DAILY_SALES, JSON.stringify(updatedList));
  } catch (err) {
    console.error(`Error writing ${KEYS.DAILY_SALES} to localStorage:`, err);
  }
}

export function getDailySales(): DailySale[] {
  const sales = JSON.parse(localStorage.getItem(KEYS.DAILY_SALES) || 'null');
  return Array.isArray(sales) && sales.length > 0 ? sales : INITIAL_DAILY_SALES;
}

// Weekly Email Reports
export function getWeeklyReports(): WeeklyEmailReport[] {
  const reports = JSON.parse(localStorage.getItem(KEYS.WEEKLY_REPORTS) || 'null');
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
  // Fungsi setStorage sudah dikomentari, gunakan localStorage.setItem langsung
  try {
    localStorage.setItem(KEYS.WEEKLY_REPORTS, JSON.stringify(updatedReports));
  } catch (err) {
    console.error(`Error writing ${KEYS.WEEKLY_REPORTS} to localStorage:`, err);
  }
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
