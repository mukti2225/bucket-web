export type ProductOccasion =
  | "Ulang Tahun"
  | "Anniversary"
  | "Wisuda"
  | "Valentine"
  | "Pernikahan"
  | "Get Well Soon"
  | "Romantic"
  | "Congratulations";

export type ProductCategory =
  | "Hand Bouquet"
  | "Flower Box"
  | "Standing Flower"
  | "Bunga Meja"
  | "Hadiah & Hampers";

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  description?: string;
  isPopular?: boolean;
}

export interface ProductAddon {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: "Terlaris" | "Best Seller" | "Favorit" | "Baru";
  shortDescription: string;
  description: string;
  flowerComposition: string[];
  images: string[];
  color: "pink" | "red" | "cream" | "yellow" | "purple" | "white";
  colorName: string;
  occasions: ProductOccasion[];
  variants: ProductVariant[];
  addons: ProductAddon[];
  stock: number;
  isFreshGuarantee: boolean;
  sameDayDelivery: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedVariant: ProductVariant;
  selectedAddons: ProductAddon[];
  floristNote?: string;
  quantity: number;
}

export interface RecipientInfo {
  name: string;
  phone: string;
  relationship?: string;
  address: string;
  city: string;
  postalCode?: string;
  deliveryNotes?: string;
}

export interface DeliverySchedule {
  date: string; // e.g. "Sen, 16 Jun 2025"
  timeSlot: string; // e.g. "13.00 - 16.00"
}

export interface GiftMessage {
  to: string;
  from: string;
  content: string;
}

export interface OrderTrackingStep {
  id: string;
  title: string;
  timestamp?: string;
  status: "completed" | "active" | "pending";
  description?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: "MENUNGGU_PEMBAYARAN" | "SEDANG_DIRANGKAI" | "QUALITY_CHECK" | "DIKIRIM" | "SELESAI";
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  recipient: RecipientInfo;
  delivery: DeliverySchedule;
  messageCard?: GiftMessage;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  qcPhotoUrl?: string;
  qcPhotoTimestamp?: string;
  qcNote?: string;
}
