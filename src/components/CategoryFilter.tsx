import { CATEGORIES } from "@/types/product";

export const ALL = "전체";
export type CategoryOption = typeof ALL | (typeof CATEGORIES)[number];

type Props = {
  value: CategoryOption;
  onChange: (value: CategoryOption) => void;
};

export default function CategoryFilter({ value, onChange }: Props) {
  const options: CategoryOption[] = [ALL, ...CATEGORIES];

  return (
    <div role="group" aria-label="분류 필터" className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = option === value;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option)}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${
              selected
                ? "border-cocoa bg-cocoa text-white"
                : "border-line bg-white text-cocoa hover:border-cocoa-soft"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
