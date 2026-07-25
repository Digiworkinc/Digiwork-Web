import { Order, OrderStatus } from '../types';

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatShortDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
  }).format(date);
}

export function getOrderStatusLabel(status: OrderStatus): { label: string; color: string; bg: string } {
  switch (status) {
    case 'PENDING':
      return { label: 'Menunggu Pembayaran', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
    case 'CONFIRMED':
      return { label: 'Pembayaran Dikonfirmasi', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' };
    case 'IN_PRODUCTION':
      return { label: 'Proses Produksi / Sablon / Cetak', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/30' };
    case 'SHIPPED':
      return { label: 'Dalam Pengiriman / Siap Diambil', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30' };
    case 'COMPLETED':
      return { label: 'Pesanan Selesai', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
    case 'CANCELLED':
      return { label: 'Dibatalkan', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/30' };
  }
}

export function generateWAMessage(order: Order, type: 'NEW_ORDER' | 'STATUS_UPDATE'): string {
  const firstItem = order.items[0];
  const itemsSummary = order.items
    .map((item, idx) => `${idx + 1}. *${item.productName}* (${item.quantity} ${item.size ? item.size + ' - ' : ''}${item.material})\n   _Harga:_ ${formatRupiah(item.totalPrice)}`)
    .join('\n');

  if (type === 'NEW_ORDER') {
    return `Halo *Digiwork Merchandise*,
Saya ingin mengonfirmasi pemesanan baru saya di website!

📌 *ID PESANAN:* #${order.id}
👤 *Nama:* ${order.customerName}
📞 *No. HP:* ${order.customerPhone}
📧 *Email:* ${order.customerEmail}
🏠 *Alamat Pengiriman:* ${order.shippingAddress}

🛒 *DETAIL ITEM:*
${itemsSummary}

💰 *TOTAL PEMBAYARAN:* *${formatRupiah(order.totalAmount)}*
💳 *Metode Pembayaran:* ${order.paymentMethod.toUpperCase()}
Status Pembayaran: *${order.paymentStatus}*

Mohon bantuannya untuk diproses dan diperiksa. Terima kasih!`;
  }

  const { label } = getOrderStatusLabel(order.orderStatus);
  return `Halo *${order.customerName}*, 
Update status pesanan Anda dengan ID *#${order.id}* di Digiwork Merchandise & Design:

📌 *STATUS SAAT INI:* *${label.toUpperCase()}*
🛍️ *Produk:* ${firstItem?.productName || 'Merchandise Custom'} (${order.items.length} item)
💰 *Total:* ${formatRupiah(order.totalAmount)}

Terima kasih telah mempercayakan merchandise custom & kebutuhan desain Anda kepada kami!
_Digiwork - Graphic Designer & Web Developer (Yogyakarta)_`;
}

export function createWALink(phone: string, text: string): string {
  let cleanPhone = phone.replace(/[^0-9]/g, '');
  if (cleanPhone.startsWith('0')) {
    cleanPhone = '62' + cleanPhone.slice(1);
  } else if (!cleanPhone.startsWith('62')) {
    cleanPhone = '62' + cleanPhone;
  }
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
