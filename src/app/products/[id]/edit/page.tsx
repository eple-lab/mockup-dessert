import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductForm from "@/components/ProductForm";
import ReadOnlyNotice from "@/components/ReadOnlyNotice";
import { getProduct, getProductIds } from "@/lib/products";
import { IS_STATIC } from "@/lib/site";

export const generateStaticParams = getProductIds;

export default function EditProductPage({ params }: PageProps<"/products/[id]/edit">) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">상품 수정</h1>
      {IS_STATIC ? (
        <ReadOnlyNotice />
      ) : (
        <Suspense fallback={<p className="py-16 text-center text-cocoa-soft">불러오는 중...</p>}>
          <EditForm params={params} />
        </Suspense>
      )}
    </div>
  );
}

async function EditForm({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(Number(id));
  if (!product) notFound();

  return <ProductForm product={product} />;
}
