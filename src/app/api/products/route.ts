import { createProduct, getProducts } from "@/lib/products";
import { validateProductInput } from "@/lib/validate";

// GET /api/products : 상품 목록 (객체로 감싸지 않은 JSON 배열)
export async function GET() {
  return Response.json(await getProducts());
}

// POST /api/products : 상품 등록
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "요청 본문이 JSON 형식이 아니에요." }, { status: 400 });
  }

  const result = validateProductInput(body);
  if (!result.ok) {
    return Response.json({ message: "입력값을 확인해 주세요.", errors: result.errors }, { status: 400 });
  }

  const product = await createProduct(result.value);
  return Response.json(product, { status: 201 });
}
