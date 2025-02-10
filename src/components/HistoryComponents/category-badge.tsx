import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

const getCategoryStyles = (category: string) => {
  const categoryColors: Record<string, string> = {
    Restaurant: "bg-orange-500 text-white border border-orange-400 shadow-md",
    "E-commerce": "bg-blue-500 text-white border border-blue-400 shadow-md",
    "Handmade Crafts":
      "bg-purple-500 text-white border border-purple-400 shadow-md",
    Technology: "bg-green-500 text-white border border-green-400 shadow-md",
    Landscaping: "bg-teal-500 text-white border border-teal-400 shadow-md",
    Architecture: "bg-gray-700 text-white border border-gray-600 shadow-md",
  };

  return (
    categoryColors[category] ||
    "bg-gray-500 text-white border border-gray-400 shadow-md"
  );
};

export function CategoryBadge({
  category,
  className = "",
}: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        getCategoryStyles(category),
        className
      )}
    >
      {category}
    </span>
  );
}

export default CategoryBadge;
