import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "달콤공방 | 수제 디저트",
  description: "매일 아침 굽는 수제 케이크, 구움과자, 마카롱, 쿠키를 만나 보세요.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">{children}</main>
        <footer className="border-t border-line py-6 text-center text-sm text-cocoa-soft">
          © 2026 달콤공방 · 목업 데이터로 만든 연습용 사이트입니다
        </footer>
      </body>
    </html>
  );
}
