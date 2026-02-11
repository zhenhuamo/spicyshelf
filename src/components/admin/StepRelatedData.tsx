"use client";

import { useEffect, useState } from "react";
import type { BookFormData } from "@/lib/admin-types";

interface BookItem {
  slug: string;
  title: string;
  author: string;
}

interface StepRelatedDataProps {
  data: BookFormData;
  onChange: (data: Partial<BookFormData>) => void;
}

export default function StepRelatedData({ data, onChange }: StepRelatedDataProps) {
  const [allBooks, setAllBooks] = useState<BookItem[]>([]);
  const [booksLoading, setBooksLoading] = useState(true);
  const [booksError, setBooksError] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch("/api/admin/books?limit=100");
        if (!res.ok) throw new Error("加载书籍列表失败");
        const result = (await res.json()) as { books?: BookItem[] } | BookItem[];
        setAllBooks(Array.isArray(result) ? result : result.books || []);
      } catch (err) {
        setBooksError(err instanceof Error ? err.message : "加载失败");
      } finally {
        setBooksLoading(false);
      }
    }
    fetchBooks();
  }, []);

  function handleBookToggle(slug: string) {
    const current = data.similar_books;
    if (current.includes(slug)) {
      onChange({ similar_books: current.filter((s) => s !== slug) });
    } else {
      onChange({ similar_books: [...current, slug] });
    }
  }

  // Exclude current book (if editing) from the list
  const availableBooks = allBooks.filter((b) => b.slug !== data.slug);

  return (
    <div className="space-y-6">
      {/* Similar Books */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">相似书籍</label>
        {booksLoading ? (
          <p className="text-sm text-gray-500">加载中...</p>
        ) : booksError ? (
          <p className="text-sm text-red-600">{booksError}</p>
        ) : availableBooks.length === 0 ? (
          <p className="text-sm text-gray-500">暂无其他书籍</p>
        ) : (
          <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md p-3 space-y-1">
            {availableBooks.map((book) => (
              <label key={book.slug} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 rounded px-1 py-0.5">
                <input
                  type="checkbox"
                  checked={data.similar_books.includes(book.slug)}
                  onChange={() => handleBookToggle(book.slug)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span>{book.title} <span className="text-gray-400">— {book.author}</span></span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Series Info */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">系列名称</label>
        <input
          type="text"
          value={data.series_name}
          onChange={(e) => onChange({ series_name: e.target.value })}
          placeholder="系列名称"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">系列编号</label>
          <input
            type="number"
            value={data.series_number ?? ""}
            onChange={(e) => onChange({ series_number: e.target.value ? Number(e.target.value) : null })}
            placeholder="第几本"
            min={1}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">系列总数</label>
          <input
            type="number"
            value={data.series_total_books ?? ""}
            onChange={(e) => onChange({ series_total_books: e.target.value ? Number(e.target.value) : null })}
            placeholder="总共几本"
            min={1}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Narrator */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">朗读者</label>
        <input
          type="text"
          value={data.narrator}
          onChange={(e) => onChange({ narrator: e.target.value })}
          placeholder="有声书朗读者"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}
