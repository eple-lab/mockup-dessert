import { promises as fs } from "node:fs";
import path from "node:path";
import { connection } from "next/server";
import { IS_STATIC } from "@/lib/site";
import type { Product, ProductInput } from "@/types/product";

// 상품 데이터를 읽고 쓰는 곳은 이 파일 하나뿐입니다.
// 나중에 실제 DB로 바꿀 때는 이 파일만 수정하면 됩니다.
const DATA_FILE = path.join(process.cwd(), "data", "products.json");

async function readAll(): Promise<Product[]> {
  const text = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(text) as Product[];
}

async function writeAll(products: Product[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2) + "\n", "utf-8");
}

// 동시에 들어온 쓰기 요청이 서로 덮어쓰지 않도록 한 번에 하나씩 실행합니다.
let queue: Promise<unknown> = Promise.resolve();
function withLock<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task);
  queue = run.catch(() => undefined);
  return run;
}

export async function getProducts(): Promise<Product[]> {
  // 빌드 시점이 아니라 요청 시점의 파일 내용을 읽도록 합니다.
  // 정적 빌드(GitHub Pages)는 빌드할 때 한 번만 읽습니다.
  if (!IS_STATIC) await connection();
  return readAll();
}

/** 상세 페이지를 미리 만들 상품 id 목록 (generateStaticParams용) */
export async function getProductIds(): Promise<{ id: string }[]> {
  const products = await readAll();
  return products.map((product) => ({ id: String(product.id) }));
}

export async function getProduct(id: number): Promise<Product | null> {
  const products = await getProducts();
  return products.find((product) => product.id === id) ?? null;
}

export function createProduct(input: ProductInput): Promise<Product> {
  return withLock(async () => {
    const products = await readAll();
    const now = new Date().toISOString();
    const product: Product = {
      id: products.reduce((max, p) => Math.max(max, p.id), 0) + 1,
      ...input,
      createdAt: now,
      updatedAt: now,
    };
    await writeAll([...products, product]);
    return product;
  });
}

export function updateProduct(id: number, input: ProductInput): Promise<Product | null> {
  return withLock(async () => {
    const products = await readAll();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const updated: Product = {
      ...products[index],
      ...input,
      updatedAt: new Date().toISOString(),
    };
    products[index] = updated;
    await writeAll(products);
    return updated;
  });
}

export function deleteProduct(id: number): Promise<boolean> {
  return withLock(async () => {
    const products = await readAll();
    const remaining = products.filter((p) => p.id !== id);
    if (remaining.length === products.length) return false;

    await writeAll(remaining);
    return true;
  });
}
