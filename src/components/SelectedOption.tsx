import { memo, useCallback } from "react";
import { X } from "lucide-react";

type PropSelect = {
  name: string;
  onRemove: (name: string) => void;
};

const SelectedOption: React.FC<PropSelect> = ({ name, onRemove }) => {
  const handleRemove = useCallback(() => {
    onRemove(name);
  }, [name, onRemove]);

  return (
    <div className="text-xs bg-blue-100 rounded text-blue-500 flex items-center overflow-hidden">
      <span className="px-2 py-1">{name}</span>
      <span onClick={handleRemove} className="border-l border-blue-300 h-full flex items-center px-1 hover:text-red-500 cursor-pointer">
        <X size={15} strokeWidth={1} />
      </span>
    </div>
  );
};

export default memo(SelectedOption);
