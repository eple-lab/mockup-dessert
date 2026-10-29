// GitHub Pages용 정적 빌드인지 여부. 정적 빌드에는 서버가 없어서 등록·수정·삭제를 할 수 없습니다.
export const IS_STATIC = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

// GitHub Pages는 https://계정.github.io/저장소이름/ 아래에서 열리므로 경로 앞에 저장소 이름이 붙습니다.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** next/link가 아닌 <img> 같은 곳에서 public 파일 경로를 쓸 때 basePath를 붙입니다. */
export function withBasePath(src: string): string {
  return src.startsWith("/") ? `${BASE_PATH}${src}` : src;
}
