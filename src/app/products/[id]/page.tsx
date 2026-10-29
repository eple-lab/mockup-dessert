import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import DeleteButton from "@/components/DeleteButton";
import ProductImage from "@/components/ProductImage";
import SoldOutBadge from "@/components/SoldOutBadge";
import { formatDate, formatPrice } from "@/lib/format";
import { getProduct, getProductIds } from "@/lib/products";
import { IS_STATIC } from "@/lib/site";

// 정적 빌드(GitHub Pages)에서 상품마다 상세 페이지를 미리 만듭니다.
export const generateStaticParams = getProductIds;

export default function ProductDetailPage({ params }: PageProps<"/products/[id]">) {
  return (
    <Suspense fallback={<p className="py-16 text-center text-cocoa-soft">불러오는 중...</p>}>
      <ProductDetail params={params} />
    </Suspense>
  );
}

async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(Number(id));
  if (!product) notFound();

  return (
    <article className="flex flex-col gap-6">
      <Link href="/" className="w-fit text-sm text-cocoa-soft hover:text-cocoa">
        ← 상품 목록으로
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <ProductImage
          src={product.image}
          alt={product.name}
          className={`aspect-[4/3] w-full rounded-3xl border border-line ${product.soldOut ? "opacity-50 grayscale" : ""}`}
        />

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-berry">{product.category}</span>
            {product.soldOut && <SoldOutBadge />}
          </div>
          <h1 className="break-keep text-2xl font-bold leading-snug sm:text-3xl">{product.name}</h1>
          <p className="text-3xl font-bold">{formatPrice(product.price)}</p>
          <p className="whitespace-pre-line leading-relaxed text-cocoa-soft">
            {product.description || "상품 설명이 아직 없어요."}
          </p>

          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 rounded-xl bg-white p-4 text-sm">
            <dt className="text-cocoa-soft">상품 번호</dt>
            <dd>{product.id}</dd>
            <dt className="text-cocoa-soft">판매 상태</dt>
            <dd>{product.soldOut ? "품절" : "판매 중"}</dd>
            <dt className="text-cocoa-soft">등록일</dt>
            <dd>{formatDate(product.createdAt)}</dd>
            <dt className="text-cocoa-soft">수정일</dt>
            <dd>{formatDate(product.updatedAt)}</dd>
          </dl>

          {!IS_STATIC && (
            <div className="mt-2 flex items-start gap-3">
              <Link
                href={`/products/${product.id}/edit`}
                className="rounded-full bg-cocoa px-5 py-2.5 font-semibold text-white hover:bg-cocoa/85"
              >
                수정
              </Link>
              <DeleteButton id={product.id} name={product.name} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
