export function formatCurrency(amount: number): string {
  if (isNaN(amount)) return "Rp0";
  return `Rp${Math.round(amount).toLocaleString("id-ID")}`;
}
