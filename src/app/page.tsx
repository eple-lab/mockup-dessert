import { Suspense } from "react";
import ProductList from "@/components/ProductList";
import { getProducts } from "@/lib/products";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      <section className="rounded-3xl bg-berry/10 px-6 py-10 sm:px-10">
        <p className="text-sm font-semibold text-berry">오늘 아침 구운 디저트</p>
        <h1 className="mt-2 break-keep text-3xl font-bold leading-tight sm:text-4xl">
          선물하고 싶은 달콤함,
          <br />
          달콤공방에서 골라 보세요
        </h1>
        <p className="mt-3 text-cocoa-soft">케이크부터 구움과자, 마카롱까지 매일 손으로 만듭니다.</p>
      </section>

      <Suspense fallback={<p className="py-16 text-center text-cocoa-soft">불러오는 중...</p>}>
        <Products />
      </Suspense>
    </div>
  );
}

async function Products() {
  const products = await getProducts();
  return <ProductList products={products} />;
}
