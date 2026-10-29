# 달콤공방 — 수제 디저트 목업 쇼핑몰

`data/products.json` 목업 데이터로 동작하는 Next.js 연습용 사이트입니다.
백엔드·데이터베이스·주문·결제는 없습니다.

## 실행

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 을 엽니다.

## GitHub Pages 배포 (보기 전용)

`main` 브랜치에 push하면 [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml)이
정적 사이트를 만들어 https://eple-lab.github.io/mockup-dessert/ 에 배포합니다.

GitHub Pages에는 서버가 없어서 배포본은 이렇게 다릅니다.

- 상품 목록·분류 필터·상세 화면만 동작합니다. 등록·수정·삭제 버튼은 숨겨집니다.
- 상품 데이터는 빌드할 때의 `data/products.json` 내용입니다. 로컬에서 바꾼 데이터를 반영하려면 커밋 후 push합니다.
- 빌드할 때 `src/app/api`를 빼고 `NEXT_PUBLIC_STATIC_EXPORT=true`로 빌드합니다 ([next.config.ts](next.config.ts), [src/lib/site.ts](src/lib/site.ts)).

## 화면

| 주소 | 화면 |
|---|---|
| `/` | 메인: 상품 목록, 분류 필터 |
| `/products/[id]` | 상품 상세, 삭제 |
| `/products/new` | 상품 등록 |
| `/products/[id]/edit` | 상품 수정 |

## 목업 API

화면의 등록·수정·삭제는 아래 API를 거쳐 `data/products.json` 파일에 바로 저장됩니다.
(파일에 쓰는 방식이라 로컬 개발용입니다. Vercel 같은 서버에 배포하면 저장되지 않습니다.)

| 메서드 | 주소 | 동작 | 성공 |
|---|---|---|---|
| GET | `/api/products` | 목록 (JSON 배열) | 200 |
| POST | `/api/products` | 등록 | 201 |
| GET | `/api/products/:id` | 하나 조회 | 200 |
| PUT | `/api/products/:id` | 수정 | 200 |
| DELETE | `/api/products/:id` | 삭제 | 204 |

잘못된 입력은 400, 없는 상품은 404를 돌려줍니다.

## 상품 데이터 필드

| 필드 | 자료형 | 설명 |
|---|---|---|
| `id` | 숫자 | 고유 번호 (등록 시 자동) |
| `name` | 문자열 | 상품명 (60자 이하) |
| `price` | 숫자 | 원 단위 가격 |
| `category` | 문자열 | 케이크 · 구움과자 · 마카롱 · 쿠키 · 타르트 |
| `image` | 문자열 | `public` 기준 경로. 빈 문자열이면 '이미지 없음' |
| `soldOut` | 불리언 | 품절 여부 |
| `description` | 문자열 | 상품 설명 (500자 이하) |
| `createdAt` | 문자열 | 등록일 (ISO 8601, 자동) |
| `updatedAt` | 문자열 | 수정일 (ISO 8601, 자동) |

## 폴더 구조

```
data/products.json        상품 목업 데이터
public/images/            상품 이미지 (SVG)
src/types/product.ts      Product 타입
src/lib/products.ts       데이터 읽기·쓰기 (DB로 바꿀 때 이 파일만 수정)
src/lib/validate.ts       입력값 검사 (화면·API 공용)
src/lib/format.ts         가격·날짜 표시 형식
src/app/                  화면과 API 라우트
src/components/           재사용 컴포넌트
```

## 확인해 볼 상황

- 빈 목록: `data/products.json`을 `[]`로 바꾸면 "등록된 상품이 없습니다."가 표시됩니다.
- 긴 상품명: 7번 타르트는 카드에서 두 줄까지만 보이고 말줄임 처리됩니다.
- 이미지 없음: 4번 휘낭시에, 8번 얼그레이 쿠키
- 품절: 2번 초콜릿 케이크, 5번 바닐라 마카롱
