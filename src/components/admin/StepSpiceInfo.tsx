"use client";

import type { BookFormData } from "@/lib/admin-types";

interface StepSpiceInfoProps {
  data: BookFormData;
  onChange: (data: Partial<BookFormData>) => void;
}

export default function StepSpiceInfo({ data, onChange }: StepSpiceInfoProps) {
  return (
    <div className="space-y-4">
      {/* Spice Level Slider */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Spice Level: <span className="text-indigo-600 font-semibold">{data.spice_level}</span>
        </label>
        <input
          type="range"
          min={0}
          max={5}
          step={1}
          value={data.spice_level}
          onChange={(e) => onChange({ spice_level: Number(e.target.value) })}
          className="w-full accent-indigo-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>

      {/* Spice Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Spice 描述</label>
        <textarea
          value={data.spice_description}
          onChange={(e) => onChange({ spice_description: e.target.value })}
          placeholder="描述 spice 内容..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Spicy Scene Count */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Spicy 场景数量</label>
        <input
          type="number"
          value={data.spicy_scene_count ?? ""}
          onChange={(e) => onChange({ spicy_scene_count: e.target.value ? Number(e.target.value) : null })}
          placeholder="场景数量"
          min={0}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Steam Level */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Steam Level</label>
        <input
          type="text"
          value={data.steam_level}
          onChange={(e) => onChange({ steam_level: e.target.value })}
          placeholder="Steam level"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* POV Style */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">POV Style</label>
        <input
          type="text"
          value={data.pov_style}
          onChange={(e) => onChange({ pov_style: e.target.value })}
          placeholder="POV style"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}
