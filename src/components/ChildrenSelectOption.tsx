import { memo, useCallback, useMemo } from "react";
import { Category } from "../types/types";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  item: string;
  onChange: (item: string) => void;
  checked: boolean;
  category: Category;
};

const ChildrenSelectOption: React.FC<Props> = ({ item, onChange, checked, category }) => {
  const handleChange = useCallback(() => {
    onChange(item);
  }, [onChange, item]);

  const checkboxId = useMemo(() => item + category.id, [item, category.id]);

  return (
    <label htmlFor={checkboxId} className="text-sm flex items-center gap-2 group cursor-pointer">
      <Checkbox
        id={checkboxId}
        checked={checked}
        onCheckedChange={handleChange}
        className="group-hover:border-black transition-colors duration-200 ease-in-out"
      />
      {item}
    </label>
  );
};

export default memo(ChildrenSelectOption);
