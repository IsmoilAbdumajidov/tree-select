import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { ChevronDown, Inbox, X } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";
import SelectedOption from "./SelectedOption";
import ChildrenSelect from "./ChildrenSelect";
import { Category } from "@/types/types";
import { filterCategories } from "@/utils/functions";

type CategoryWithMatch = Category & { matchInItems: boolean };

const TreeSelect = ({ data }: { data: Category[] }) => {
  const [onOpen, setOnOpen] = useState(false);
  const [inpValue, setInpValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useClickOutside(ref, () => setOnOpen(false));

  const dataFilter: CategoryWithMatch[] = useMemo(() => {
    return filterCategories(data, inpValue);
  }, [data, inpValue]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInpValue(e.target.value);
    },
    []
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && inpValue === "" && selectedItem.length > 0) {
        setSelectedItem((prev) => prev.slice(0, -1));
      }
    },
    [inpValue, selectedItem]
  );

  const toggleDropdown = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    inputRef.current?.focus();
    setOnOpen((prev) => !prev);
  }, []);

  const clearSelected = useCallback(() => {
    setSelectedItem([]);
  }, []);

  const handleRemoveItem = useCallback((name: string) => {
    setSelectedItem((prev) => prev.filter((item) => item !== name));
  }, []);

  return (
    <div className="p-3 flex justify-center items-start h-screen gap-10">
      <div
        ref={ref}
        onClick={() => {
          setOnOpen(true);
          inputRef.current?.focus();
        }}
        className="relative block w-full max-w-80"
      >
        <div className={`${onOpen ? 'border-x border-t rounded-t-md' : 'border rounded-md'} ps-2 relative flex justify-between items-center gap-1`}>
          <div className="flex gap-1 py-2 flex-wrap items-center w-full min-h-10">
            {selectedItem.map((item) => (
              <SelectedOption
                key={item}
                onRemove={handleRemoveItem}
                name={item}
              />
            ))}
            <Input
              ref={inputRef}
              style={{ width: `${Math.max(inpValue.length + 1, 2)}ch` }}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              value={inpValue}
              className="outline-none max-w-full min-w-[15px] border-none p-0 h-auto rounded-none shadow-none focus-visible:ring-0"
            />
            {!inpValue && selectedItem.length === 0 && (
              <div className="text-gray-400 absolute text-sm">Select option...</div>
            )}
          </div>

          {selectedItem.length > 0 && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                clearSelected();
              }}
              className="py-2 flex items-center cursor-pointer hover:text-red-500"
            >
              <X size={15} strokeWidth={1} />
            </div>
          )}

          <div
            onClick={toggleDropdown}
            className="py-2 pe-2 flex items-center cursor-pointer"
          >
            <ChevronDown size={20} strokeWidth={1} className={onOpen ? "rotate-180 transition-transform" : "transition-transform"} />
          </div>
        </div>

        {onOpen && (
          <div className="absolute border top-full border-t-0 rounded-b-md bg-white w-full z-10 max-h-52 overflow-auto">
            {dataFilter.length > 0 ? (
              dataFilter.map((category) => (
                <div key={category.id} className="border-t py-1">
                  <ChildrenSelect
                    category={category}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    search={inpValue}
                  />
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center py-2 border-t text-gray-500">
                <Inbox size={32} strokeWidth={0.5} />
                <div className="text-[11px]">No data</div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-green-100 p-3 w-80 text-xs">
        <pre>{JSON.stringify(selectedItem, null, 2)}</pre>
      </div>
    </div>
  );
};

export default memo(TreeSelect);
