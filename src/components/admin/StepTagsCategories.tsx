"use client";

import { useEffect, useState } from "react";
import type { BookFormData } from "@/lib/admin-types";
import TagInput from "./TagInput";

interface TropeItem {
  slug: string;
  name: string;
  emoji: string;
}

interface StepTagsCategoriesProps {
  data: BookFormData;
  onChange: (data: Partial<BookFormData>) => void;
}

export default function StepTagsCategories({ data, onChange }: StepTagsCategoriesProps) {
  const [allTropes, setAllTropes] = useState<TropeItem[]>([]);
  const [tropesLoading, setTropesLoading] = useState(true);
  const [tropesError, setTropesError] = useState("");

  useEffect(() => {
    async function fetchTropes() {
      try {
        const res = await fetch("/api/admin/tropes");
        if (!res.ok) throw new Error("加载 tropes 失败");
        const tropesData = (await res.json()) as { tropes?: TropeItem[] } | TropeItem[];
        setAllTropes(Array.isArray(tropesData) ? tropesData : tropesData.tropes || []);
      } catch (err) {
        setTropesError(err instanceof Error ? err.message : "加载失败");
      } finally {
        setTropesLoading(false);
      }
    }
    fetchTropes();
  }, []);

  function handleTropeToggle(slug: string) {
    const current = data.tropes;
    if (current.includes(slug)) {
      onChange({ tropes: current.filter((s) => s !== slug) });
    } else {
      onChange({ tropes: [...current, slug] });
    }
  }

  return (
    <div className="space-y-6">
      {/* Tropes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tropes</label>
        {tropesLoading ? (
          <p className="text-sm text-gray-500">加载中...</p>
        ) : tropesError ? (
          <p className="text-sm text-red-600">{tropesError}</p>
        ) : allTropes.length === 0 ? (
          <p className="text-sm text-gray-500">暂无 tropes 数据</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto border border-gray-200 rounded-md p-3">
            {allTropes.map((trope) => (
              <label key={trope.slug} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 rounded px-1 py-0.5">
                <input
                  type="checkbox"
                  checked={data.tropes.includes(trope.slug)}
                  onChange={() => handleTropeToggle(trope.slug)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span>{trope.emoji} {trope.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Subgenres */}
      <TagInput
        label="Subgenres"
        value={data.subgenres}
        onChange={(subgenres) => onChange({ subgenres })}
        placeholder="输入 subgenre 后按回车"
      />

      {/* Content Warnings */}
      <TagInput
        label="Content Warnings"
        value={data.content_warnings}
        onChange={(content_warnings) => onChange({ content_warnings })}
        placeholder="输入 content warning 后按回车"
      />

      {/* Moods */}
      <TagInput
        label="Moods"
        value={data.moods}
        onChange={(moods) => onChange({ moods })}
        placeholder="输入 mood 后按回车"
      />
    </div>
  );
}
