import { Category } from "../types/types";

export type CategoryWithMatch = Category & { matchInItems: boolean };

export const filterCategories = (
  data: Category[],
  search: string
): CategoryWithMatch[] => {
  const trimmed = search.trim().toLowerCase();

  if (trimmed === '') {
    return data.map((category) => ({ ...category, matchInItems: false }));
  }

  return data.reduce<CategoryWithMatch[]>((acc, category) => {
    const matchInItems = category.items.some((item) =>
      item.toLowerCase().includes(search.toLowerCase())
    );
    const matchInCategory = category.name
      .toLowerCase()
      .includes(search.toLowerCase());

    if (matchInItems || matchInCategory) {
      acc.push({ ...category, matchInItems });
    }

    return acc;
  }, []);
};


// children select option filter
export const filterItems = (
  data: string[],
  search: string
): string[] => {
  const trimmed = search.trim().toLowerCase();

  if (trimmed === '') return data;

  const matchInItems = data.some((item) =>
    item.toLowerCase().includes(trimmed)
  );

  if (matchInItems) {
    const filteredItems = data.filter((item) =>
      item.toLowerCase().includes(trimmed)
    );
    return filteredItems;
  }
  else return data
}


