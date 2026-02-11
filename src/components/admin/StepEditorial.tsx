"use client";

import type { BookFormData } from "@/lib/admin-types";
import ListInput from "./ListInput";

interface StepEditorialProps {
  data: BookFormData;
  onChange: (data: Partial<BookFormData>) => void;
}

export default function StepEditorial({ data, onChange }: StepEditorialProps) {
  return (
    <div className="space-y-6">
      {/* Editorial Review */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">编辑评论</label>
        <textarea
          value={data.editorial_review}
          onChange={(e) => onChange({ editorial_review: e.target.value })}
          placeholder="编辑评论内容..."
          rows={8}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Perfect For */}
      <ListInput
        label="Perfect For"
        value={data.perfect_for}
        onChange={(perfect_for) => onChange({ perfect_for })}
        placeholder="适合的读者类型..."
      />

      {/* Skip If */}
      <ListInput
        label="Skip If"
        value={data.skip_if}
        onChange={(skip_if) => onChange({ skip_if })}
        placeholder="不适合的情况..."
      />
    </div>
  );
}
