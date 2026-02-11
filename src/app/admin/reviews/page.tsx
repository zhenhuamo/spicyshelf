"use client";

import { useState, useEffect, useCallback } from "react";

interface Review {
  id: number;
  book_slug: string;
  username: string;
  spice_rating: number;
  text: string;
  date: string;
  source: string;
}

interface BookOption {
  slug: string;
  title: string;
}

const emptyForm = { book_slug: "", username: "", spice_rating: 3, text: "", date: "", source: "" };

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [books, setBooks] = useState<BookOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterBook, setFilterBook] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchBooks = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/books?limit=500");
      if (res.ok) {
        const data = (await res.json()) as { books: BookOption[] };
        setBooks(data.books.map((b) => ({ slug: b.slug, title: b.title })));
      }
    } catch { /* ignore */ }
  }, []);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const params = filterBook ? `?book_slug=${filterBook}` : "";
      const res = await fetch(`/api/admin/reviews${params}`);
      if (res.ok) setReviews(await res.json());
    } finally {
      setLoading(false);
    }
  }, [filterBook]);

  useEffect(() => { fetchBooks(); }, [fetchBooks]);
  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.book_slug) { setError("请选择书籍"); return; }
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, date: form.date || new Date().toISOString().split("T")[0] }),
      });
      if (!res.ok) throw new Error("创建失败");
      setForm(emptyForm);
      fetchReviews();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "操作失败");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("确定删除这条评论？")) return;
    try {
      await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
      fetchReviews();
    } catch {
      setError("删除失败");
    }
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">评论管理</h1>

      {/* Add Review Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-4 mb-6 space-y-3">
        <h2 className="text-sm font-medium text-gray-700">添加评论</h2>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <select
            value={form.book_slug}
            onChange={(e) => setForm({ ...form, book_slug: e.target.value })}
            required
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">选择书籍 *</option>
            {books.map((b) => <option key={b.slug} value={b.slug}>{b.title}</option>)}
          </select>
          <input
            type="text"
            placeholder="用户名 *"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 whitespace-nowrap">Spice 评分:</label>
            <input
              type="range"
              min={1}
              max={5}
              value={form.spice_rating}
              onChange={(e) => setForm({ ...form, spice_rating: Number(e.target.value) })}
              className="flex-1"
            />
            <span className="text-sm font-medium w-6 text-center">{form.spice_rating}</span>
          </div>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="来源（如 Goodreads、Amazon）"
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <textarea
          placeholder="评论内容"
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button type="submit" disabled={saving} className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 disabled:opacity-50 transition-colors cursor-pointer">
          {saving ? "保存中..." : "添加评论"}
        </button>
      </form>

      {/* Filter */}
      <div className="mb-4">
        <select
          value={filterBook}
          onChange={(e) => setFilterBook(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">全部书籍</option>
          {books.map((b) => <option key={b.slug} value={b.slug}>{b.title}</option>)}
        </select>
      </div>

      {/* Review List */}
      {loading ? (
        <div className="text-sm text-gray-500 py-8 text-center">加载中...</div>
      ) : reviews.length === 0 ? (
        <div className="text-sm text-gray-500 py-8 text-center">暂无评论</div>
      ) : (
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-gray-900">{r.username}</span>
                    <span className="text-gray-400">·</span>
                    <span className="text-gray-500">{r.book_slug}</span>
                    <span className="text-gray-400">·</span>
                    <span className="text-orange-500">{"🌶️".repeat(r.spice_rating)}</span>
                    {r.date && <><span className="text-gray-400">·</span><span className="text-gray-400 text-xs">{r.date}</span></>}
                    {r.source && <><span className="text-gray-400">·</span><span className="text-gray-400 text-xs">{r.source}</span></>}
                  </div>
                  {r.text && <p className="text-sm text-gray-700 mt-1">{r.text}</p>}
                </div>
                <button onClick={() => handleDelete(r.id)} className="text-red-600 hover:text-red-800 text-xs ml-4 cursor-pointer">删除</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-gray-400 mt-3">共 {reviews.length} 条评论</p>
    </div>
  );
}
