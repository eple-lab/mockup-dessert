import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import SoldOutBadge from "@/components/SoldOutBadge";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative">
        <ProductImage
          src={product.image}
          alt={product.name}
          className={`aspect-[4/3] w-full ${product.soldOut ? "opacity-50 grayscale" : ""}`}
        />
        {product.soldOut && (
          <div className="absolute left-3 top-3">
            <SoldOutBadge />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs font-medium text-berry">{product.category}</span>
        <h3 className="line-clamp-2 break-keep font-semibold leading-snug group-hover:text-berry-dark">
          {product.name}
        </h3>
        <p className={`mt-auto pt-2 text-lg font-bold ${product.soldOut ? "text-cocoa-soft line-through" : ""}`}>
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
