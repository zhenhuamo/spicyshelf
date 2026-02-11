"use client";

import { useState } from "react";
import type { BookFormData, IsbnLookupResponse } from "@/lib/admin-types";
import { slugify, buildAmazonUrl } from "@/lib/utils";

interface StepBasicInfoProps {
  data: BookFormData;
  onChange: (data: Partial<BookFormData>) => void;
}

export default function StepBasicInfo({ data, onChange }: StepBasicInfoProps) {
  const [isbnLoading, setIsbnLoading] = useState(false);
  const [isbnError, setIsbnError] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  async function handleIsbnLookup() {
    if (!data.isbn.trim()) return;
    setIsbnLoading(true);
    setIsbnError("");
    try {
      const res = await fetch(`/api/admin/isbn-lookup?isbn=${encodeURIComponent(data.isbn.trim())}`);
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(err.error || "获取信息失败");
      }
      const info: IsbnLookupResponse = await res.json();
      const updates: Partial<BookFormData> = {
        title: info.title || data.title,
        author: info.author || data.author,
        description: info.description || data.description,
        page_count: info.page_count || data.page_count,
        publish_year: info.publish_year || data.publish_year,
        cover_url: info.cover_url || data.cover_url,
      };
      if (info.title && !slugManuallyEdited) {
        updates.slug = slugify(info.title);
      }
      onChange(updates);
    } catch (err) {
      setIsbnError(err instanceof Error ? err.message : "获取信息失败");
    } finally {
      setIsbnLoading(false);
    }
  }

  function handleTitleChange(title: string) {
    const updates: Partial<BookFormData> = { title };
    if (!slugManuallyEdited) {
      updates.slug = slugify(title);
    }
    onChange(updates);
  }

  function handleSlugChange(slug: string) {
    setSlugManuallyEdited(true);
    onChange({ slug });
  }

  const amazonUrl = buildAmazonUrl(data.asin);

  return (
    <div className="space-y-4">
      {/* ISBN */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={data.isbn}
            onChange={(e) => onChange({ isbn: e.target.value })}
            placeholder="输入 ISBN"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={handleIsbnLookup}
            disabled={isbnLoading || !data.isbn.trim()}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {isbnLoading ? "获取中..." : "获取信息"}
          </button>
        </div>
        {isbnError && <p className="mt-1 text-sm text-red-600">{isbnError}</p>}
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">书名</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="书名"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
        <input
          type="text"
          value={data.slug}
          onChange={(e) => handleSlugChange(e.target.value)}
          placeholder="url-friendly-slug"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <p className="mt-1 text-xs text-gray-500">从书名自动生成，也可手动修改</p>
      </div>

      {/* Author */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">作者</label>
        <input
          type="text"
          value={data.author}
          onChange={(e) => onChange({ author: e.target.value })}
          placeholder="作者"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
        <textarea
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="书籍描述"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Page Count & Publish Year */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">页数</label>
          <input
            type="number"
            value={data.page_count ?? ""}
            onChange={(e) => onChange({ page_count: e.target.value ? Number(e.target.value) : null })}
            placeholder="页数"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">出版年份</label>
          <input
            type="number"
            value={data.publish_year ?? ""}
            onChange={(e) => onChange({ publish_year: e.target.value ? Number(e.target.value) : null })}
            placeholder="出版年份"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Cover URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">封面 URL</label>
        <input
          type="text"
          value={data.cover_url}
          onChange={(e) => onChange({ cover_url: e.target.value })}
          placeholder="https://..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {data.cover_url && (
          <div className="mt-2">
            <img
              src={data.cover_url}
              alt="封面预览"
              className="h-24 w-auto rounded border border-gray-200 object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
        )}
      </div>

      {/* ASIN */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">ASIN</label>
        <input
          type="text"
          value={data.asin}
          onChange={(e) => onChange({ asin: e.target.value })}
          placeholder="Amazon ASIN"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {amazonUrl && (
          <p className="mt-1 text-xs text-gray-500">
            Amazon URL:{" "}
            <a href={amazonUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
              {amazonUrl}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
