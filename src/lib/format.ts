export function formatPrice(price: number): string {
  return `${price.toLocaleString("ko-KR")}원`;
}

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Seoul",
});

export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}
