import { create } from "zustand";
import { RecipientInfo, DeliverySchedule, GiftMessage } from "@/types";

interface CheckoutDraftState {
  step: 1 | 2 | 3 | 4;
  senderName: string;
  senderPhone: string;
  senderEmail: string;
  recipient: RecipientInfo;
  delivery: DeliverySchedule;
  messageCard: GiftMessage;
  paymentMethod: string;
  orderNotes?: string;
  setStep: (step: 1 | 2 | 3 | 4) => void;
  updateSender: (sender: { name: string; phone: string; email: string }) => void;
  updateRecipient: (recipient: Partial<RecipientInfo>) => void;
  updateDelivery: (delivery: Partial<DeliverySchedule>) => void;
  updateMessageCard: (messageCard: Partial<GiftMessage>) => void;
  setPaymentMethod: (method: string) => void;
  resetCheckout: () => void;
}

const DEFAULT_RECIPIENT: RecipientInfo = {
  name: "Cantika Budi Santosa",
  phone: "0812-3456-7890",
  relationship: "Pasangan",
  address: "Jl. Melati No. 10, Kebayoran Baru",
  city: "Jakarta Selatan",
  postalCode: "12140",
  deliveryNotes: "Titipkan ke security jika penerima sedang keluar.",
};

const DEFAULT_DELIVERY: DeliverySchedule = {
  date: "Sen, 16 Jun 2025",
  timeSlot: "13.00 - 16.00 (Slot Siang)",
};

const DEFAULT_MESSAGE: GiftMessage = {
  to: "Cantika",
  from: "Budi",
  content:
    "Selamat ulang tahun yang terindah untukmu! Semoga harimu seharum dan seindah bunga-bunga ini.",
};

export const useCheckoutStore = create<CheckoutDraftState>((set) => ({
  step: 1,
  senderName: "Budi Santoso",
  senderPhone: "0812-3456-7890",
  senderEmail: "budi.santoso@example.com",
  recipient: DEFAULT_RECIPIENT,
  delivery: DEFAULT_DELIVERY,
  messageCard: DEFAULT_MESSAGE,
  paymentMethod: "qris",
  orderNotes: "",
  setStep: (step) => set({ step }),
  updateSender: (sender) =>
    set({
      senderName: sender.name,
      senderPhone: sender.phone,
      senderEmail: sender.email,
    }),
  updateRecipient: (recipient) =>
    set((state) => ({
      recipient: { ...state.recipient, ...recipient },
    })),
  updateDelivery: (delivery) =>
    set((state) => ({
      delivery: { ...state.delivery, ...delivery },
    })),
  updateMessageCard: (messageCard) =>
    set((state) => ({
      messageCard: { ...state.messageCard, ...messageCard },
    })),
  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
  resetCheckout: () =>
    set({
      step: 1,
      paymentMethod: "qris",
    }),
}));
