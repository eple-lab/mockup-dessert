import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <p className="text-5xl font-bold text-berry">404</p>
      <h1 className="text-xl font-semibold">찾으시는 디저트가 없어요</h1>
      <p className="text-cocoa-soft">삭제되었거나 주소가 잘못되었을 수 있어요.</p>
      <Link href="/" className="rounded-full bg-berry px-5 py-2.5 font-semibold text-white hover:bg-berry-dark">
        상품 목록으로
      </Link>
    </div>
  );
}
