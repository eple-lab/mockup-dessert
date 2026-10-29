import { deleteProduct, getProduct, updateProduct } from "@/lib/products";
import { validateProductInput } from "@/lib/validate";

type Context = RouteContext<"/api/products/[id]">;

async function parseId(ctx: Context): Promise<number | null> {
  const { id } = await ctx.params;
  const num = Number(id);
  return Number.isInteger(num) && num > 0 ? num : null;
}

const notFound = () => Response.json({ message: "상품을 찾을 수 없어요." }, { status: 404 });

// GET /api/products/:id : 상품 하나 조회
export async function GET(_request: Request, ctx: Context) {
  const id = await parseId(ctx);
  const product = id === null ? null : await getProduct(id);
  return product ? Response.json(product) : notFound();
}

// PUT /api/products/:id : 상품 정보 전체 교체 (id와 등록일은 유지)
export async function PUT(request: Request, ctx: Context) {
  const id = await parseId(ctx);
  if (id === null) return notFound();

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

  const product = await updateProduct(id, result.value);
  return product ? Response.json(product) : notFound();
}

// DELETE /api/products/:id : 상품 삭제
export async function DELETE(_request: Request, ctx: Context) {
  const id = await parseId(ctx);
  if (id === null || !(await deleteProduct(id))) return notFound();
  return new Response(null, { status: 204 });
}
