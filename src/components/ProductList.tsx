"use client";

import { useState } from "react";
import CategoryFilter, { ALL, type CategoryOption } from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

export default function ProductList({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<CategoryOption>(ALL);

  // 선택한 분류(상태) 하나로 카드 목록과 결과 수를 함께 계산합니다.
  const visible = category === ALL ? products : products.filter((p) => p.category === category);

  if (products.length === 0) {
    return <EmptyState message="등록된 상품이 없습니다." />;
  }

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <CategoryFilter value={category} onChange={setCategory} />
        <p className="text-sm text-cocoa-soft" aria-live="polite">
          {visible.length}개의 디저트
        </p>
      </div>

      {visible.length === 0 ? (
        <EmptyState message={`'${category}' 분류에는 아직 상품이 없습니다.`} />
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((product) => (
            <li key={product.id} className="flex">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-white py-16 text-center text-cocoa-soft">
      {message}
    </div>
  );
}
