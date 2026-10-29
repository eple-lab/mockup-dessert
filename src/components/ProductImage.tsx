"use client";

import { useState } from "react";
import { withBasePath } from "@/lib/site";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

// image가 빈 문자열이거나 파일을 불러오지 못하면 '이미지 없음'을 보여 줍니다.
export default function ProductImage({ src, alt, className = "" }: Props) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) {
    return (
      <div className={`flex items-center justify-center bg-line/60 text-sm text-cocoa-soft ${className}`}>
        이미지 없음
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- 목업용 로컬 SVG라 최적화가 필요 없습니다
    <img src={withBasePath(src)} alt={alt} className={`object-cover ${className}`} onError={() => setFailedSrc(src)} />
  );
}
