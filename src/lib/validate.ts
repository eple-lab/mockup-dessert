import { CATEGORIES, type Category, type ProductInput } from "@/types/product";

export const LIMITS = {
  nameMax: 60,
  priceMax: 1_000_000,
  descriptionMax: 500,
} as const;

export type FieldErrors = Partial<Record<keyof ProductInput, string>>;

export type ValidationResult =
  | { ok: true; value: ProductInput }
  | { ok: false; errors: FieldErrors };

// 화면(입력 폼)과 API가 같은 규칙으로 값을 검사합니다.
export function validateProductInput(body: unknown): ValidationResult {
  const data = (typeof body === "object" && body !== null ? body : {}) as Record<string, unknown>;
  const errors: FieldErrors = {};

  const name = typeof data.name === "string" ? data.name.trim() : "";
  if (!name) errors.name = "상품명을 입력해 주세요.";
  else if (name.length > LIMITS.nameMax) errors.name = `상품명은 ${LIMITS.nameMax}자 이하로 입력해 주세요.`;

  const price = data.price;
  if (typeof price !== "number" || !Number.isInteger(price)) {
    errors.price = "가격은 원 단위 정수로 입력해 주세요.";
  } else if (price < 0 || price > LIMITS.priceMax) {
    errors.price = `가격은 0원부터 ${LIMITS.priceMax.toLocaleString("ko-KR")}원까지 입력할 수 있어요.`;
  }

  const category = data.category;
  if (typeof category !== "string" || !CATEGORIES.includes(category as Category)) {
    errors.category = "분류를 선택해 주세요.";
  }

  const image = typeof data.image === "string" ? data.image.trim() : "";
  if (image && !image.startsWith("/")) {
    errors.image = "이미지 경로는 /images/cake.svg 처럼 /로 시작해야 해요.";
  }

  if (typeof data.soldOut !== "boolean") errors.soldOut = "품절 여부가 올바르지 않아요.";

  const description = typeof data.description === "string" ? data.description.trim() : "";
  if (description.length > LIMITS.descriptionMax) {
    errors.description = `설명은 ${LIMITS.descriptionMax}자 이하로 입력해 주세요.`;
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    value: {
      name,
      price: price as number,
      category: category as Category,
      image,
      soldOut: data.soldOut as boolean,
      description,
    },
  };
}
