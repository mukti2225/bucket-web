import { Recipient, ApiResponse } from "@/types";

const INITIAL_RECIPIENTS: Recipient[] = [
  {
    id: "rec-1",
    name: "Cantika Budi Santosa",
    phone: "0812-3456-7890",
    relationship: "Pasangan",
    address: "Jl. Melati No. 10, Kebayoran Baru",
    city: "Jakarta Selatan",
    postalCode: "12140",
    notes: "Suka warna soft pink, mawar, dan wangi bunga segar.",
    importantDates: [
      {
        id: "d-1",
        title: "Ulang Tahun Cantika",
        date: "16 Juni",
        occasion: "Ulang Tahun",
        recipientName: "Cantika Budi Santosa",
        recipientId: "rec-1",
        relationship: "Pasangan",
      },
      {
        id: "d-2",
        title: "Anniversary Pacaran",
        date: "24 September",
        occasion: "Anniversary",
        recipientName: "Cantika Budi Santosa",
        recipientId: "rec-1",
        relationship: "Pasangan",
      },
    ],
  },
  {
    id: "rec-2",
    name: "Siti Aminah (Ibu)",
    phone: "0813-8888-7777",
    relationship: "Ibu",
    address: "Jl. Dahlia Blok C3 No. 12, Tebet",
    city: "Jakarta Selatan",
    postalCode: "12810",
    notes: "Lebih suka bunga anggrek atau lily putih elegan.",
    importantDates: [
      {
        id: "d-3",
        title: "Ulang Tahun Ibu",
        date: "12 Oktober",
        occasion: "Ulang Tahun",
        recipientName: "Siti Aminah (Ibu)",
        recipientId: "rec-2",
        relationship: "Ibu",
      },
      {
        id: "d-4",
        title: "Hari Ibu Nasional",
        date: "22 Desember",
        occasion: "Hari Ibu",
        recipientName: "Siti Aminah (Ibu)",
        recipientId: "rec-2",
        relationship: "Ibu",
      },
    ],
  },
];

let memoryRecipients: Recipient[] = [...INITIAL_RECIPIENTS];

export const recipientService = {
  async getRecipients(): Promise<ApiResponse<Recipient[]>> {
    return { success: true, data: memoryRecipients };
  },

  async addRecipient(recipient: Omit<Recipient, "id">): Promise<ApiResponse<Recipient>> {
    const newRecipient: Recipient = {
      ...recipient,
      id: `rec-${Date.now()}`,
    };
    memoryRecipients.push(newRecipient);
    return { success: true, data: newRecipient };
  },

  async updateRecipient(id: string, updates: Partial<Recipient>): Promise<ApiResponse<Recipient>> {
    const idx = memoryRecipients.findIndex((r) => r.id === id);
    if (idx > -1) {
      memoryRecipients[idx] = { ...memoryRecipients[idx], ...updates };
      return { success: true, data: memoryRecipients[idx] };
    }
    return {
      success: false,
      data: null as unknown as Recipient,
      error: { code: "NOT_FOUND", message: "Penerima tidak ditemukan" },
    };
  },

  async deleteRecipient(id: string): Promise<ApiResponse<boolean>> {
    memoryRecipients = memoryRecipients.filter((r) => r.id !== id);
    return { success: true, data: true };
  },
};
