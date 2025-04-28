"use client";

import { useTranslations } from "next-intl";
import { useCategoryProvider } from "@/providers/CategoryProvider";
import { filterForm } from "@/types/Category";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getDetailArticle } from "@/actions/article";
import { useNotificationProvider } from "@/providers/NotificationProvider";
import { Article } from "@/types/Articles";
import { useParams } from "next/navigation";
import { useArticle } from "@/providers/ArticleProvider";

export const useDetailArticle = () => {
  const t = useTranslations("ListArticles");
  const { categories, categoryOptions } = useCategoryProvider();

  const [article, setArticle] = useState<Article>();

  const params = useParams();
  const id = params?.id as string;

  const { control } = useForm<filterForm>();

  const { articles, setFilter } = useArticle();

  const { showNotification } = useNotificationProvider();

  const getArticle = async (id: string) => {
    try {
      const response = await getDetailArticle(id);
      if (response.isSuccess) {
        console.log("Fetched articles:", response);
        setArticle(response.data);
        showNotification({
          type: "success",
          message: t("getArticleSuccess"),
          mode: "toast",
        });
      } else {
        showNotification({
          type: "error",
          message: response.message,
          mode: "toast",
        });
      }
    } catch (error) {
      showNotification({
        type: "error",
        message: (error as Error).message,
        mode: "toast",
      });
    }
  };

  useEffect(() => {
    if (id) {
      getArticle(id);
      setFilter({ category: "", limit: 3, page: 1, search: "" });
    }
  }, [id]);

  return {
    t,
    control,
    categories,
    categoryOptions,
    article,
    articles,
  };
};
