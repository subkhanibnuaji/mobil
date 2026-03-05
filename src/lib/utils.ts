export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("id-ID").format(num);
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function calculateMonthlyPaymentFlat(
  principal: number,
  annualRate: number,
  tenorYears: number
): number {
  const totalInterest = principal * (annualRate / 100) * tenorYears;
  const totalPayment = principal + totalInterest;
  return totalPayment / (tenorYears * 12);
}

export function calculateMonthlyPaymentEffective(
  principal: number,
  annualRate: number,
  tenorYears: number
): number {
  const monthlyRate = annualRate / 100 / 12;
  const months = tenorYears * 12;
  if (monthlyRate === 0) return principal / months;
  return (
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
    (Math.pow(1 + monthlyRate, months) - 1)
  );
}
