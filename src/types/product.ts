export const CATEGORIES = ["케이크", "구움과자", "마카롱", "쿠키", "타르트"] as const;

export type Category = (typeof CATEGORIES)[number];

export type Product = {
  id: number;
  name: string;
  /** 원 단위 숫자 */
  price: number;
  category: Category;
  /** public 폴더 기준 경로. 빈 문자열이면 '이미지 없음' */
  image: string;
  soldOut: boolean;
  description: string;
  /** ISO 8601 문자열 */
  createdAt: string;
  updatedAt: string;
};

/** 등록·수정 화면에서 사용자가 입력하는 값 (id와 날짜는 서버가 정함) */
export type ProductInput = Pick<
  Product,
  "name" | "price" | "category" | "image" | "soldOut" | "description"
>;
