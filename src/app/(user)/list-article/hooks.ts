'use client';

import { useTranslations } from "next-intl";
import getCategoryAction from "@/app/(user)/list-article/actions";
import { useEffect } from "react";
import { useCategory } from "@/providers/CategoryProvider";
import { filterForm } from "@/types/Category";
import { useForm } from "react-hook-form";

export const useListArticle = () => {
  const t = useTranslations("ListArticles");
  const { categories, categoryOptions, setCategories } = useCategory();

  const {
    control,
  } = useForm<filterForm>();

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

  const listArticle = () => {
    return [
      { id: 1, title: "Article 1", content: "Content of Article 1" },
      { id: 2, title: "Article 2", content: "Content of Article 2" },
      { id: 3, title: "Article 3", content: "Content of Article 3" },
    ];
  };

  useEffect(() => {
    getCategory();
  }
  , []);

  return {
    t,
    control,
    categories,
    categoryOptions,
    listArticle,
  };
};
