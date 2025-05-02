"use client";

import { getCategoryAction } from "@/app/(user)/list-article/actions";
import { OptionProps } from "@/components/Select";
import { Category, CategoryResponse, FilterForm } from "@/types/Category";
import { Pagination } from "@/types/Common";
import { generateOptions } from "@/utils/generateOptions";
import { createContext, useContext, useEffect, useState } from "react";

interface CategoryState {
  category: Category | undefined;
  setCategory: (category: Category | undefined) => void;

  categories: CategoryResponse | undefined;
  setCategories: (categories: CategoryResponse) => void;

  pagination: Pagination;
  setPagination: (pagination: Pagination) => void;

  categoryOptions: OptionProps[];

  filter: FilterForm | undefined;
  setFilter: (filter: FilterForm) => void;

  getCategory: (filter: FilterForm | undefined) => void;
}

const categroyContext = createContext<CategoryState>({
  category: undefined,
  setCategory: () => {},

  categories: undefined,
  setCategories: () => {},

  pagination: {
    currentPage: 1,
    totalData: 0,
    dataPerPage: 9,
  },
  setPagination: () => {},

  filter: undefined,
  setFilter: () => {},

  categoryOptions: [],
  getCategory: async () => {},
});

export const useCategoryProvider = () => useContext(categroyContext);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [categories, setCategories] = useState<CategoryResponse | undefined>(
    undefined
  );
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalData: 0,
    dataPerPage: 9,
  },)
  const [filter, setFilter] = useState<FilterForm | undefined>({
    category: '',
    limit: pagination.dataPerPage,
    page: pagination.currentPage
  });

  const getCategory = async (filters: FilterForm | undefined) => {
    try {
      const response = await getCategoryAction(filters?.page, filters?.limit);   
      if (response.isSuccess) {
        setCategories(response.data);
        setPagination({
          currentPage: response.data.currentPage,
          totalData: response.data.totalData,
          dataPerPage: pagination.dataPerPage,
          totalPages: response.data.totalPages
        })
      } else {
        console.log("Error fetching categories:", response.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const categoryOptions = generateOptions("name", undefined, categories?.data);

  useEffect(() => {
    getCategory(filter);
  }, [filter]);

  return (
    <categroyContext.Provider
      value={{
        category,
        setCategory,

        categories,
        setCategories,

        pagination,
        setPagination,

        categoryOptions,
        getCategory,

        filter,
        setFilter
      }}
    >
      {children}
    </categroyContext.Provider>
  );
};
