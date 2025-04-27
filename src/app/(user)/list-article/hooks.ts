'use client';

import { useTranslations } from "next-intl";
import { useCategory } from "@/providers/CategoryProvider";
import { filterForm } from "@/types/Category";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useArticle } from "@/providers/ArticleProvider";

export const useListArticle = () => {
  const t = useTranslations("ListArticles");
  const { categories, categoryOptions } = useCategory();
  const router = useRouter();

  const { articles } = useArticle();

  const {
    control,
  } = useForm<filterForm>(); 

  const goToDetailArticle = (id: string) => {
    router.push(`/article/${id}`);
  };

  return {
    t,
    control,
    categories,
    categoryOptions,
    articles,
    goToDetailArticle,
  };
};
