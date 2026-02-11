"use client";

interface ListInputProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export default function ListInput({ label, value, onChange, placeholder }: ListInputProps) {
  function addRow() {
    onChange([...value, ""]);
  }

  function updateRow(index: number, newValue: string) {
    const updated = [...value];
    updated[index] = newValue;
    onChange(updated);
  }

  function removeRow(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="space-y-2">
        {value.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateRow(i, e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={() => removeRow(i)}
              className="px-3 py-2 text-red-600 text-sm font-medium border border-red-200 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
            >
              删除
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addRow}
        className="mt-2 px-3 py-2 text-sm font-medium text-indigo-600 border border-indigo-200 rounded-md hover:bg-indigo-50 transition-colors cursor-pointer"
      >
        添加
      </button>
    </div>
  );
}
