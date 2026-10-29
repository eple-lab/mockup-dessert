import ProductForm from "@/components/ProductForm";
import ReadOnlyNotice from "@/components/ReadOnlyNotice";
import { IS_STATIC } from "@/lib/site";

export default function NewProductPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">상품 등록</h1>
      {IS_STATIC ? <ReadOnlyNotice /> : <ProductForm />}
    </div>
  );
}
