import { create } from "zustand";
import { PRODUCTS } from "@/data/products";

export interface CartLineItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  variantName: string;
  variantPrice: number;
  addons: { id: string; name: string; price: number }[];
  quantity: number;
  floristNote?: string;
}

interface CartStoreState {
  items: CartLineItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartLineItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalAmount: () => number;
  totalCount: () => number;
}

export const useCartStore = create<CartStoreState>((set, get) => ({
  items: [
    {
      id: "cart-item-1",
      productId: "prod-1",
      name: "Sweet Blush",
      image: PRODUCTS[0].images[0],
      variantName: "Regular",
      variantPrice: 599000,
      addons: [
        { id: "addon-card", name: "Kartu Ucapan Premium", price: 10000 },
      ],
      quantity: 1,
    },
  ],
  isOpen: false,
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  addItem: (item) =>
    set((state) => {
      const existingIndex = state.items.findIndex(
        (i) =>
          i.productId === item.productId &&
          i.variantName === item.variantName &&
          JSON.stringify(i.addons) === JSON.stringify(item.addons)
      );

      if (existingIndex > -1) {
        const nextItems = [...state.items];
        nextItems[existingIndex].quantity += item.quantity;
        return { items: nextItems, isOpen: true };
      }

      const newItem: CartLineItem = {
        ...item,
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      };
      return { items: [...state.items, newItem], isOpen: true };
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  updateQuantity: (id, delta) =>
    set((state) => {
      const nextItems = state.items
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartLineItem[];

      return { items: nextItems };
    }),
  clearCart: () => set({ items: [] }),
  totalAmount: () => {
    return get().items.reduce((sum, item) => {
      const addonsTotal = item.addons.reduce((a, b) => a + b.price, 0);
      return sum + (item.variantPrice + addonsTotal) * item.quantity;
    }, 0);
  },
  totalCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));
