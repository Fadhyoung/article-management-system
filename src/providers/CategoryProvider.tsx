"use client";

import { getCategoryAction } from "@/app/(user)/list-article/actions";
import { OptionProps } from "@/components/Select";
import { CategoryResponse } from "@/types/Category";
import { generateOptions } from "@/utils/generateOptions";
import { createContext, useContext, useEffect, useState } from "react";

interface CategoryState {
  categories: CategoryResponse | undefined;
  setCategories: (categories: CategoryResponse) => void;

  page: number;
  setPage: (page: number) => void;

  limit: number;
  setLimit: (limit: number) => void;
  categoryOptions: OptionProps[];

  getCategory: () => void;
}

const categroyContext = createContext<CategoryState>({
  categories: undefined,
  setCategories: () => {},

  page: 0,
  setPage: () => {},

  limit: 1,
  setLimit: () => {},

  categoryOptions: [],
  getCategory: async () => {},
});

export const useCategory = () => useContext(categroyContext);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<CategoryResponse | undefined>(undefined);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(1);

  const getCategory = async () => {
      try {
        const response = await getCategoryAction();
        if (response.isSuccess) {
          setCategories(response.data);
          console.log("Fetched categories:", response.data);
          return response.data;
        } else {
          console.log("Error fetching categories:", response.message);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

  const categoryOptions = generateOptions('name', undefined, categories?.data);

  console.log("Category options:", categoryOptions);

  useEffect(() => {
    getCategory();
  }
  , []);

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
        getCategory,
      }}
    >
      {children}
    </categroyContext.Provider>
  );
};
