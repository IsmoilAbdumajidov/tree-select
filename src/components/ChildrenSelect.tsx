import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Category } from "../types/types";
import ChildrenSelectOption from "./ChildrenSelectOption";
import { Checkbox } from "@/components/ui/checkbox";
import { filterItems } from "@/utils/functions";
import { ChevronRight } from "lucide-react";

type Props = {
  category: Category & { matchInItems: boolean };
  selectedItem: string[];
  setSelectedItem: React.Dispatch<React.SetStateAction<string[]>>;
  search: string;
};

const ChildrenSelect: React.FC<Props> = ({
  category,
  selectedItem,
  setSelectedItem,
  search,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(category.matchInItems);

  useEffect(() => {
    setIsOpen(category.matchInItems)
  }, [category.matchInItems])


  const filteredItems = useMemo(
    () => filterItems(category.items, search),
    [category.items, search]
  );

  console.log(category);

  const isAllSelected = useMemo(() => {
    return (
      selectedItem.includes(category.name) ||
      (category.items.length > 0 &&
        category.items.every((item) => selectedItem.includes(item)))
    );
  }, [selectedItem, category]);

  const isSomeSelected = useMemo(() => {
    return (
      !isAllSelected &&
      category.items.some((item) => selectedItem.includes(item))
    );
  }, [selectedItem, category, isAllSelected]);

  const handleCategoryToggle = useCallback(() => {
    setSelectedItem((prev) => {
      const isSelected = prev.includes(category.name);
      if (isSelected) {
        return prev.filter((item) => item !== category.name);
      }
      return [
        ...prev.filter((item) => !category.items.includes(item)),
        category.name,
      ];
    });
  }, [category, setSelectedItem]);

  const handleItemToggle = useCallback(
    (item: string) => {
      setSelectedItem((prev) => {
        const isCategorySelected = prev.includes(category.name);
        const isItemSelected = prev.includes(item);

        if (isCategorySelected) {
          return [
            ...prev.filter((i) => i !== category.name),
            ...category.items.filter((i) => i !== item),
          ];
        }

        const updated = isItemSelected
          ? prev.filter((i) => i !== item)
          : [...prev, item];

        const allSelected = category.items.every((i) => updated.includes(i));
        if (allSelected) {
          return [
            ...updated.filter((i) => !category.items.includes(i)),
            category.name,
          ];
        }

        return updated;
      });
    },
    [category, setSelectedItem]
  );

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 px-2">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Collapse category" : "Expand category"}
        >
          <ChevronRight
            size={20}
            strokeWidth={1}
            className={isOpen ? "rotate-90 transition-transform" : ""}
          />
        </button>
        <Checkbox
          checked={isAllSelected || isSomeSelected && 'indeterminate'}
          onCheckedChange={handleCategoryToggle}
          id={`category-${category.id}`}
        />
        <label
          htmlFor={`category-${category.id}`}
          className="text-sm font-medium cursor-pointer"
        >
          {category.name}
        </label>
      </div>
      {isOpen && (
        <div className="flex flex-col gap-1 ps-14">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <ChildrenSelectOption
                key={item}
                category={category}
                item={item}
                onChange={handleItemToggle}
                checked={selectedItem.includes(item) || isAllSelected}
              />
            ))
          ) : (
            <div className="text-xs py-2 text-gray-500">No Items...</div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(ChildrenSelect);
