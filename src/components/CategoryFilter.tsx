import { Button } from '@/components/ui/button';
import { MemeCategory } from '@/types/meme';

interface CategoryFilterProps {
  categories: MemeCategory[];
  activeCategory: MemeCategory;
  onCategoryChange: (category: MemeCategory) => void;
}

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category)}
          className={
            activeCategory === category 
              ? "btn-gradient border-0" 
              : "border-border hover:border-primary/50 hover:bg-primary/10"
          }
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;