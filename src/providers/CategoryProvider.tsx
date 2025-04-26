"use client";

import { OptionProps } from "@/components/Select";
import { CategoryResponse } from "@/types/Category";
import { generateOptions } from "@/utils/generateOptions";
import { createContext, useContext, useState } from "react";

interface CategoryState {
  categories: CategoryResponse | undefined;
  setCategories: (categories: CategoryResponse) => void;

  page: number;
  setPage: (page: number) => void;

  limit: number;
  setLimit: (limit: number) => void;
  categoryOptions: OptionProps[];
}

const categroyContext = createContext<CategoryState>({
  categories: undefined,
  setCategories: () => {},

  page: 0,
  setPage: () => {},

  limit: 1,
  setLimit: () => {},

  categoryOptions: [],
});

export const useCategory = () => useContext(categroyContext);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<CategoryResponse | undefined>(undefined);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(1);

  const categoryOptions = generateOptions('name', undefined, categories?.data);

  console.log("Category options:", categoryOptions);

  return (
    <categroyContext.Provider
      value={{
        categories,
        setCategories,

        page,
        setPage,

        limit,
        setLimit,

        categoryOptions,
      }}
    >
      {children}
    </categroyContext.Provider>
  );
};
