"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import ProductImage from "@/components/ProductImage";
import { LIMITS, validateProductInput, type FieldErrors } from "@/lib/validate";
import { CATEGORIES, type Product } from "@/types/product";

const PRESET_IMAGES = [
  "/images/strawberry-cake.svg",
  "/images/chocolate-cake.svg",
  "/images/madeleine.svg",
  "/images/macaron.svg",
  "/images/cookie.svg",
  "/images/tart.svg",
];

type Props = {
  /** 값이 있으면 수정, 없으면 등록 */
  product?: Product;
};

// 등록과 수정 화면이 같이 쓰는 입력 폼입니다.
export default function ProductForm({ product }: Props) {
  const router = useRouter();
  const isEdit = product !== undefined;

  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [category, setCategory] = useState<string>(product?.category ?? "");
  const [image, setImage] = useState(product?.image ?? "");
  const [soldOut, setSoldOut] = useState(product?.soldOut ?? false);
  const [description, setDescription] = useState(product?.description ?? "");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const result = validateProductInput({
      name,
      price: price.trim() === "" ? null : Number(price),
      category,
      image,
      soldOut,
      description,
    });
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      const response = await fetch(isEdit ? `/api/products/${product.id}` : "/api/products", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.value),
      });
      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors ?? {});
        setMessage(data.message ?? "저장하지 못했어요. 다시 시도해 주세요.");
        return;
      }

      router.push(`/products/${(data as Product).id}`);
    } catch {
      setMessage("서버에 연결하지 못했어요. 개발 서버가 실행 중인지 확인해 주세요.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-8 md:grid-cols-[1fr_280px]">
      <div className="flex flex-col gap-5">
        <Field label="상품명" htmlFor="name" error={errors.name} required>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={LIMITS.nameMax}
            placeholder="예) 딸기 생크림 케이크"
            className={inputClass(errors.name)}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="가격 (원)" htmlFor="price" error={errors.price} required>
            <input
              id="price"
              type="number"
              inputMode="numeric"
              min={0}
              max={LIMITS.priceMax}
              step={100}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="32000"
              className={inputClass(errors.price)}
            />
          </Field>

          <Field label="분류" htmlFor="category" error={errors.category} required>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass(errors.category)}
            >
              <option value="">분류 선택</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field
          label="이미지 경로"
          htmlFor="image"
          error={errors.image}
          hint="public 폴더 기준 경로입니다. 비워 두면 '이미지 없음'으로 표시돼요."
        >
          <input
            id="image"
            list="preset-images"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="/images/strawberry-cake.svg"
            className={inputClass(errors.image)}
          />
          <datalist id="preset-images">
            {PRESET_IMAGES.map((src) => (
              <option key={src} value={src} />
            ))}
          </datalist>
        </Field>

        <Field label="상품 설명" htmlFor="description" error={errors.description}>
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={LIMITS.descriptionMax}
            placeholder="맛과 재료, 구성 등을 소개해 주세요."
            className={inputClass(errors.description)}
          />
          <span className="self-end text-xs text-cocoa-soft">
            {description.length} / {LIMITS.descriptionMax}
          </span>
        </Field>

        <label className="flex w-fit cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={soldOut}
            onChange={(e) => setSoldOut(e.target.checked)}
            className="size-4 accent-berry"
          />
          <span className="text-sm font-medium">품절 상품으로 표시</span>
        </label>

        {message && (
          <p role="alert" className="rounded-lg bg-berry/10 px-4 py-3 text-sm text-berry-dark">
            {message}
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-berry px-6 py-2.5 font-semibold text-white hover:bg-berry-dark disabled:opacity-60"
          >
            {submitting ? "저장 중..." : isEdit ? "수정 완료" : "등록하기"}
          </button>
          <Link
            href={isEdit ? `/products/${product.id}` : "/"}
            className="rounded-full border border-line bg-white px-6 py-2.5 font-semibold hover:border-cocoa-soft"
          >
            취소
          </Link>
        </div>
      </div>

      <aside className="flex flex-col gap-2">
        <span className="text-sm font-medium">이미지 미리보기</span>
        <ProductImage src={image.trim()} alt="미리보기" className="aspect-[4/3] w-full rounded-2xl border border-line" />
      </aside>
    </form>
  );
}

function inputClass(error?: string) {
  return `w-full rounded-lg border bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-berry/30 ${
    error ? "border-berry" : "border-line focus:border-berry"
  }`;
}

type FieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
};

function Field({ label, htmlFor, error, hint, required, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
        {required && <span className="ml-0.5 text-berry">*</span>}
      </label>
      {children}
      {error ? (
        <p className="text-sm text-berry-dark">{error}</p>
      ) : (
        hint && <p className="text-xs text-cocoa-soft">{hint}</p>
      )}
    </div>
  );
}
