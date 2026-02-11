"use client";

import { useRouter } from "next/navigation";
import BookFormSteps from "@/components/admin/BookFormSteps";
import type { BookFormData } from "@/lib/admin-types";

const emptyFormData: BookFormData = {
  slug: "", title: "", author: "", description: "",
  page_count: null, publish_year: null, isbn: "", cover_url: "", asin: "",
  spice_level: 0, spice_description: "", spicy_scene_count: null,
  steam_level: "", pov_style: "",
  tropes: [], subgenres: [], content_warnings: [], moods: [],
  editorial_review: "", perfect_for: [], skip_if: [],
  similar_books: [], series_name: "", series_number: null,
  series_total_books: null, narrator: "",
};

export default function AdminNewBookPage() {
  const router = useRouter();

  async function handleSubmit(data: BookFormData) {
    const res = await fetch("/api/admin/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push("/admin/books");
    } else {
      const errData = (await res.json()) as { error?: string };
      alert(errData.error || "创建失败");
    }
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">添加新书</h1>
      <BookFormSteps initialData={emptyFormData} onSubmit={handleSubmit} />
    </div>
  );
}
