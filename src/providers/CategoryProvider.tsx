"use client";

import { getCategoryAction } from "@/app/(user)/list-article/actions";
import { OptionProps } from "@/components/Select";
import { CategoryResponse } from "@/types/Category";
import { Pagination } from "@/types/Common";
import { generateOptions } from "@/utils/generateOptions";
import { createContext, useContext, useEffect, useState } from "react";

interface CategoryState {
  categories: CategoryResponse | undefined;
  setCategories: (categories: CategoryResponse) => void;

  pagination: Pagination;
  setPagination: (pagination: Pagination) => void;

  categoryOptions: OptionProps[];

  getCategory: () => void;
}

const categroyContext = createContext<CategoryState>({
  categories: undefined,
  setCategories: () => {},

  pagination: {
    currentPage: 1,
    totalData: 0,
    dataPerPage: 1,
  },
  setPagination: () => {},

  categoryOptions: [],
  getCategory: async () => {},
});

export const useCategoryProvider = () => useContext(categroyContext);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const [categories, setCategories] = useState<CategoryResponse | undefined>(
    undefined
  );
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalData: 0,
    dataPerPage: 1,
  },)

  const getCategory = async () => {
    try {
      const response = await getCategoryAction(1, 2);
      if (response.isSuccess) {
        console.log('sdfafasdfas ', response)
        setCategories(response.data);
        setPagination({
          currentPage: response.data.currentPage,
          totalData: response.data.totalData,
          dataPerPage:  response.data.dataPerPage,
          totalPages: Math.ceil(response.data.totalData / response.data.dataPerPage),
        })    
        return response.data;
      } else {
        console.log("Error fetching categories:", response.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const categoryOptions = generateOptions("name", undefined, categories?.data);

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <categroyContext.Provider
      value={{
        categories,
        setCategories,

        pagination,
        setPagination,

        categoryOptions,
        getCategory,
      }}
    >
      {children}
    </categroyContext.Provider>
  );
};
