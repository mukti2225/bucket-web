import { ImportantDate, ApiResponse } from "@/types";

const INITIAL_DATES: ImportantDate[] = [
  {
    id: "rem-1",
    title: "Ulang Tahun Cantika",
    date: "16 Juni",
    occasion: "Ulang Tahun",
    recipientName: "Cantika Budi Santosa",
    recipientId: "rec-1",
    relationship: "Pasangan",
  },
  {
    id: "rem-2",
    title: "Anniversary Pacaran",
    date: "24 September",
    occasion: "Anniversary",
    recipientName: "Cantika Budi Santosa",
    recipientId: "rec-1",
    relationship: "Pasangan",
  },
  {
    id: "rem-3",
    title: "Ulang Tahun Ibu",
    date: "12 Oktober",
    occasion: "Ulang Tahun",
    recipientName: "Siti Aminah (Ibu)",
    recipientId: "rec-2",
    relationship: "Ibu",
  },
  {
    id: "rem-4",
    title: "Hari Ibu Nasional",
    date: "22 Desember",
    occasion: "Hari Ibu",
    recipientName: "Siti Aminah (Ibu)",
    recipientId: "rec-2",
    relationship: "Ibu",
  },
];

let memoryDates: ImportantDate[] = [...INITIAL_DATES];

export const reminderService = {
  async getImportantDates(): Promise<ApiResponse<ImportantDate[]>> {
    return { success: true, data: memoryDates };
  },

  async addImportantDate(item: Omit<ImportantDate, "id">): Promise<ApiResponse<ImportantDate>> {
    const newItem: ImportantDate = {
      ...item,
      id: `rem-${Date.now()}`,
    };
    memoryDates.push(newItem);
    return { success: true, data: newItem };
  },

  async deleteImportantDate(id: string): Promise<ApiResponse<boolean>> {
    memoryDates = memoryDates.filter((d) => d.id !== id);
    return { success: true, data: true };
  },
};
