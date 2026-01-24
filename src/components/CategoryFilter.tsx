import { useCategories } from "@/hooks/useArticles";
import { Button } from "./ui/button";

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  const { data: categories = [] } = useCategories();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedCategory === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => onSelectCategory("all")}
        className="transition-all"
      >
        All News
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category.slug}
          variant={selectedCategory === category.slug ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectCategory(category.slug)}
          className="transition-all"
        >
          <span className="mr-1.5">{category.icon}</span>
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
