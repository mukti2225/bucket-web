import { api } from "./api";
import { Order, ApiResponse } from "@/types";

const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-1",
    orderNumber: "FD250616-00123",
    createdAt: "2025-06-16T10:24:00Z",
    status: "SEDANG_DIRANGKAI",
    customerName: "Budi Santoso",
    customerPhone: "0812-3456-7890",
    customerEmail: "budi.santoso@example.com",
    recipient: {
      name: "Cantika Budi Santosa",
      phone: "0812-3456-7890",
      relationship: "Pasangan",
      address: "Jl. Melati No. 10, Kebayoran Baru",
      city: "Jakarta Selatan",
      postalCode: "12140",
      deliveryNotes: "Titipkan ke security jika penerima sedang keluar.",
    },
    delivery: {
      date: "Sen, 16 Jun 2025",
      timeSlot: "13.00 - 16.00",
    },
    messageCard: {
      to: "Cantika",
      from: "Budi",
      content: "Selamat ulang tahun yang terindah untukmu! Semoga harimu seharum dan seindah bunga-bunga ini.",
    },
    items: [
      {
        id: "cart-item-1",
        product: {
          id: "prod-1",
          slug: "sweet-blush",
          name: "Sweet Blush",
          category: "Hand Bouquet",
          price: 599000,
          rating: 4.9,
          reviewsCount: 128,
          shortDescription: "Buket mawar pink lembut berpadu baby breath segar.",
          description: "Perpaduan bunga mawar soft pink dengan carnation dan eucalyptus segar.",
          flowerComposition: ["Mawar Soft Pink", "Baby's Breath Import", "Eucalyptus Parvifolia"],
          images: [
            "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80",
          ],
          color: "pink",
          colorName: "Soft Pink",
          occasions: ["Ulang Tahun", "Anniversary"],
          variants: [
            { id: "v1", name: "Regular", price: 599000 },
            { id: "v2", name: "Deluxe", price: 799000 },
          ],
          addons: [],
          stock: 12,
          isFreshGuarantee: true,
          sameDayDelivery: true,
        },
        selectedVariant: { id: "v1", name: "Regular", price: 599000 },
        selectedAddons: [
          { id: "addon-card", name: "Kartu Ucapan Premium", price: 10000, image: "" },
        ],
        quantity: 1,
      },
    ],
    subtotal: 599000,
    deliveryFee: 30000,
    total: 629000,
    qcPhotoUrl: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80",
    qcPhotoTimestamp: "16 Jun 2025, 12:15 WIB",
    qcNote: "Buket dirangkai dengan kesegaran grade A, pita satin blush terpasang rapi.",
  },
  {
    id: "ord-2",
    orderNumber: "FD250616-00122",
    createdAt: "2025-06-16T09:15:00Z",
    status: "MENUNGGU_PEMBAYARAN",
    customerName: "Siti Rahma",
    customerPhone: "0813-9999-8888",
    customerEmail: "siti.rahma@example.com",
    recipient: {
      name: "Ibu Fatimah",
      phone: "0813-1111-2222",
      relationship: "Ibu",
      address: "Jl. Tebet Barat Dalam No. 45",
      city: "Jakarta Selatan",
    },
    delivery: {
      date: "Sen, 16 Jun 2025",
      timeSlot: "10.00 - 13.00",
    },
    messageCard: {
      to: "Ibu tercinta",
      from: "Siti",
      content: "Terima kasih untuk segalanya Ibu. Semoga sehat dan bahagia selalu.",
    },
    items: [],
    subtotal: 769000,
    deliveryFee: 30000,
    total: 799000,
  },
];

let memoryOrders: Order[] = [...INITIAL_ORDERS];

export const orderService = {
  async getOrders(): Promise<ApiResponse<Order[]>> {
    const res = await api.get<Order[]>("/orders");
    if (res.success && res.data) {
      return res;
    }
    return { success: true, data: memoryOrders };
  },

  async getOrderByNumber(orderNumber: string): Promise<ApiResponse<Order | null>> {
    const res = await api.get<Order>(`/orders/${orderNumber}`);
    if (res.success && res.data) {
      return res;
    }

    const order =
      memoryOrders.find(
        (o) =>
          o.orderNumber.toLowerCase() === orderNumber.toLowerCase() ||
          o.id.toLowerCase() === orderNumber.toLowerCase()
      ) || memoryOrders[0]; // fallback to first order for demo

    return {
      success: true,
      data: order,
    };
  },

  async updateOrderStatus(
    orderNumber: string,
    status: Order["status"],
    qcData?: { qcPhotoUrl?: string; qcPhotoTimestamp?: string; qcNote?: string }
  ): Promise<ApiResponse<Order>> {
    const res = await api.post<Order>(`/orders/${orderNumber}/status`, { status, ...qcData });
    if (res.success && res.data) {
      return res;
    }

    const index = memoryOrders.findIndex((o) => o.orderNumber === orderNumber);
    if (index > -1) {
      memoryOrders[index] = {
        ...memoryOrders[index],
        status,
        ...(qcData?.qcPhotoUrl ? { qcPhotoUrl: qcData.qcPhotoUrl } : {}),
        ...(qcData?.qcPhotoTimestamp ? { qcPhotoTimestamp: qcData.qcPhotoTimestamp } : {}),
        ...(qcData?.qcNote ? { qcNote: qcData.qcNote } : {}),
      };
      return { success: true, data: memoryOrders[index] };
    }

    return {
      success: false,
      data: null as unknown as Order,
      error: { code: "NOT_FOUND", message: "Pesanan tidak ditemukan" },
    };
  },
};
