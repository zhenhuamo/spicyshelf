"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BookFormSteps from "@/components/admin/BookFormSteps";
import type { BookFormData } from "@/lib/admin-types";

export default function AdminEditBookPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [initialData, setInitialData] = useState<BookFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBook() {
      try {
        const res = await fetch(`/api/admin/books/${slug}`);
        if (!res.ok) throw new Error("加载书籍失败");
        const data = (await res.json()) as BookFormData;
        setInitialData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "加载失败");
      } finally {
        setLoading(false);
      }
    }
    loadBook();
  }, [slug]);

  async function handleSubmit(data: BookFormData) {
    const res = await fetch(`/api/admin/books/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push("/admin/books");
    } else {
      alert("更新失败");
    }
  }

  async function handleDelete() {
    const res = await fetch(`/api/admin/books/${slug}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/books");
    } else {
      alert("删除失败");
    }
  }

  if (loading) return <div className="text-sm text-gray-500 py-8 text-center">加载中...</div>;
  if (error) return <div className="text-sm text-red-600 py-8 text-center">{error}</div>;
  if (!initialData) return <div className="text-sm text-gray-500 py-8 text-center">书籍不存在</div>;

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">编辑书籍</h1>
      <BookFormSteps
        initialData={initialData}
        onSubmit={handleSubmit}
        isEdit
        onDelete={handleDelete}
      />
    </div>
  );
}
