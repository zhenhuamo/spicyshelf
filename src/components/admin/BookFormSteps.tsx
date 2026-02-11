"use client";

import { useState } from "react";
import type { BookFormData } from "@/lib/admin-types";
import StepBasicInfo from "./StepBasicInfo";
import StepSpiceInfo from "./StepSpiceInfo";
import StepTagsCategories from "./StepTagsCategories";
import StepEditorial from "./StepEditorial";
import StepRelatedData from "./StepRelatedData";

interface BookFormStepsProps {
  initialData: BookFormData;
  onSubmit: (data: BookFormData) => Promise<void>;
  isEdit?: boolean;
  onDelete?: () => Promise<void>;
}

const STEPS = [
  { label: "基础信息" },
  { label: "Spice信息" },
  { label: "标签分类" },
  { label: "编辑内容" },
  { label: "关联数据" },
];

export default function BookFormSteps({ initialData, onSubmit, isEdit, onDelete }: BookFormStepsProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<BookFormData>(initialData);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  function handleChange(partial: Partial<BookFormData>) {
    setFormData((prev) => ({ ...prev, ...partial }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!onDelete) return;
    setDeleting(true);
    try {
      await onDelete();
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  }

  return (
    <div>
      {/* Step Indicator */}
      <div className="flex items-center mb-8">
        {STEPS.map((step, i) => (
          <div key={i} className="flex items-center flex-1">
            <button
              type="button"
              onClick={() => setCurrentStep(i)}
              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                i === currentStep
                  ? "bg-indigo-600 text-white"
                  : i < currentStep
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {i + 1}
            </button>
            <span
              className={`ml-2 text-sm hidden sm:inline ${
                i === currentStep ? "text-indigo-600 font-medium" : "text-gray-500"
              }`}
            >
              {step.label}
            </span>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-3 ${i < currentStep ? "bg-indigo-300" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        {currentStep === 0 && <StepBasicInfo data={formData} onChange={handleChange} />}
        {currentStep === 1 && <StepSpiceInfo data={formData} onChange={handleChange} />}
        {currentStep === 2 && <StepTagsCategories data={formData} onChange={handleChange} />}
        {currentStep === 3 && <StepEditorial data={formData} onChange={handleChange} />}
        {currentStep === 4 && <StepRelatedData data={formData} onChange={handleChange} />}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <div>
          {isEdit && onDelete && (
            <>
              {showDeleteConfirm ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-red-600">确认删除？</span>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors cursor-pointer"
                  >
                    {deleting ? "删除中..." : "确认"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    取消
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 text-red-600 text-sm font-medium border border-red-200 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                >
                  删除书籍
                </button>
              )}
            </>
          )}
        </div>

        <div className="flex gap-3">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={() => setCurrentStep((s) => s - 1)}
              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
            >
              上一步
            </button>
          )}
          {currentStep < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((s) => s + 1)}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              下一步
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 disabled:opacity-50 transition-colors cursor-pointer"
            >
              {submitting ? "提交中..." : isEdit ? "更新书籍" : "创建书籍"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
