'use client';

import { useTranslations } from "next-intl";
import { useCategoryProvider } from "@/providers/CategoryProvider";
import { filterForm } from "@/types/Category";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useArticle } from "@/providers/ArticleProvider";
import { useEffect } from "react";

export const useListArticle = () => {
  const t = useTranslations("ListArticles");
  const { categories, categoryOptions } = useCategoryProvider();
  const router = useRouter();

  const { articles , getArticles} = useArticle();

  const {
    control,
  } = useForm<filterForm>(); 

  const goToDetailArticle = (id: string) => {
    router.push(`/article/${id}`);
  };

  useEffect(() => {
    getArticles();
    });

  return {
    t,
    control,
    categories,
    categoryOptions,
    articles,
    goToDetailArticle,
  };
};
