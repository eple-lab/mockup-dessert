import Link from "next/link";

// 정적 빌드(GitHub Pages)에서 등록·수정 화면 대신 보여 줍니다.
export default function ReadOnlyNotice() {
  return (
    <div className="flex flex-col items-start gap-4 rounded-2xl border border-line bg-white p-6">
      <p className="text-cocoa-soft">
        이 사이트는 보기 전용 데모라 상품을 등록하거나 수정할 수 없어요. 내 컴퓨터에서 <code>npm run dev</code>로
        실행하면 모든 기능을 쓸 수 있어요.
      </p>
      <Link href="/" className="rounded-full bg-berry px-5 py-2.5 font-semibold text-white hover:bg-berry-dark">
        상품 목록으로
      </Link>
    </div>
  );
}
