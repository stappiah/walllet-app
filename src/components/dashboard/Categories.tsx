import React from "react";

const categories = [
  { label: "Income", value: "GHS 12,000" },
  { label: "Expenses", value: "GHS 8,500" },
  { label: "Groceries", value: "GHS 3,500" },
  { label: "Entertainment", value: "GHS 3,500" },
  { label: "Utilities", value: "GHS 2,000" },
];

export default function Categories() {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between bg-white rounded-lg shadow p-4 sm:p-6 gap-4 sm:gap-0">
      {categories.map((cat, idx) => (
        <React.Fragment key={cat.label}>
          <div className="flex flex-col items-center gap-1 min-w-[90px] flex-1">
            <span className="text-xl sm:text-2xl font-semibold text-gray-800">
              {cat.value}
            </span>
            <span className="text-xs sm:text-sm text-gray-500">{cat.label}</span>
          </div>
          {idx < categories.length - 1 && (
            <div className="hidden sm:block mx-4 h-10 w-px bg-gray-200" />
          )}
          {idx < categories.length - 1 && (
            <div className="block sm:hidden w-full h-px bg-gray-200 my-2" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
