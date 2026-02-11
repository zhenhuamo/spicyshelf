"use client";

import { useState, useEffect, useCallback } from "react";

interface Trope {
  slug: string;
  name: string;
  description: string;
  emoji: string;
}

const emptyForm = { slug: "", name: "", description: "", emoji: "" };

export default function AdminTropesPage() {
  const [tropes, setTropes] = useState<Trope[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchTropes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/tropes");
      if (res.ok) setTropes(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTropes(); }, [fetchTropes]);

  function slugify(s: string) {
    return s.toLowerCase().replace(/'/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function startEdit(t: Trope) {
    setEditingSlug(t.slug);
    setForm({ slug: t.slug, name: t.name, description: t.description || "", emoji: t.emoji || "" });
    setError("");
  }

  function cancelEdit() {
    setEditingSlug(null);
    setForm(emptyForm);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = { ...form, slug: form.slug || slugify(form.name) };

    try {
      if (editingSlug) {
        const res = await fetch(`/api/admin/tropes/${editingSlug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const errData = (await res.json()) as { error?: string };
          throw new Error(errData.error || "更新失败");
        }
      } else {
        const res = await fetch("/api/admin/tropes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const errData = (await res.json()) as { error?: string };
          throw new Error(errData.error || "创建失败");
        }
      }
      cancelEdit();
      fetchTropes();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "操作失败");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm(`确定删除 trope "${slug}"？关联的书籍将取消关联。`)) return;
    try {
      await fetch(`/api/admin/tropes/${slug}`, { method: "DELETE" });
      fetchTropes();
    } catch {
      setError("删除失败");
    }
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Trope 管理</h1>

      {/* Add / Edit Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-4 mb-6 space-y-3">
        <h2 className="text-sm font-medium text-gray-700">{editingSlug ? `编辑: ${editingSlug}` : "添加新 Trope"}</h2>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="名称 *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value, slug: editingSlug ? form.slug : slugify(e.target.value) })}
            required
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Slug（自动生成）"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Emoji（可选）"
            value={form.emoji}
            onChange={(e) => setForm({ ...form, emoji: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="描述（可选）"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={saving} className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 disabled:opacity-50 transition-colors cursor-pointer">
            {saving ? "保存中..." : editingSlug ? "更新" : "添加"}
          </button>
          {editingSlug && (
            <button type="button" onClick={cancelEdit} className="px-4 py-2 border border-gray-300 text-sm rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
              取消
            </button>
          )}
        </div>
      </form>

      {/* Trope List */}
      {loading ? (
        <div className="text-sm text-gray-500 py-8 text-center">加载中...</div>
      ) : tropes.length === 0 ? (
        <div className="text-sm text-gray-500 py-8 text-center">暂无 Trope</div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-medium text-gray-600">Emoji</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">名称</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Slug</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">描述</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody>
              {tropes.map((t) => (
                <tr key={t.slug} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">{t.emoji || "—"}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{t.name}</td>
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs">{t.slug}</td>
                  <td className="px-4 py-3 text-gray-600 truncate max-w-[200px]">{t.description || "—"}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => startEdit(t)} className="text-indigo-600 hover:text-indigo-800 text-xs cursor-pointer">编辑</button>
                    <button onClick={() => handleDelete(t.slug)} className="text-red-600 hover:text-red-800 text-xs cursor-pointer">删除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="text-xs text-gray-400 mt-3">共 {tropes.length} 个 Trope</p>
    </div>
  );
}
