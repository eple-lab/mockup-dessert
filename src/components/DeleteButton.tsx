"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  id: number;
  name: string;
};

export default function DeleteButton({ id, name }: Props) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    if (!window.confirm(`'${name}' 상품을 삭제할까요?\n삭제하면 되돌릴 수 없어요.`)) return;

    setDeleting(true);
    setError("");
    try {
      const response = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!response.ok) {
        setError(response.status === 404 ? "이미 삭제된 상품이에요." : "삭제하지 못했어요. 다시 시도해 주세요.");
        return;
      }
      router.push("/");
    } catch {
      setError("서버에 연결하지 못했어요.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className="rounded-full border border-berry px-5 py-2.5 font-semibold text-berry hover:bg-berry hover:text-white disabled:opacity-60"
      >
        {deleting ? "삭제 중..." : "삭제"}
      </button>
      {error && (
        <p role="alert" className="text-sm text-berry-dark">
          {error}
        </p>
      )}
    </div>
  );
}
