import Link from "next/link";
import { IS_STATIC } from "@/lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-cream/90 backdrop-blur">
      {IS_STATIC && (
        <p className="bg-cocoa px-4 py-1.5 text-center text-xs text-white">
          보기 전용 데모입니다. 상품 등록·수정·삭제는 내 컴퓨터에서 <code>npm run dev</code>로 실행해 사용할 수 있어요.
        </p>
      )}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-xl font-bold tracking-tight">
          달콤<span className="text-berry">공방</span>
        </Link>
        {!IS_STATIC && (
          <Link
            href="/products/new"
            className="rounded-full bg-berry px-4 py-2 text-sm font-semibold text-white hover:bg-berry-dark"
          >
            + 상품 등록
          </Link>
        )}
      </div>
    </header>
  );
}
