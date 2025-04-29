"use client";

import { useTranslations } from "next-intl";
import { useCategoryProvider } from "@/providers/CategoryProvider";
import { useEffect, useState } from "react";
import getArticleListAction, { getDetailArticle } from "@/actions/article";
import { useNotificationProvider } from "@/providers/NotificationProvider";
import { Article } from "@/types/Articles";
import { useParams } from "next/navigation";
import { useArticle } from "@/providers/ArticleProvider";

export const useDetailArticle = () => {
  const t = useTranslations("Article");
  const { categories, categoryOptions } = useCategoryProvider();

  const [article, setArticle] = useState<Article>();
  const [articles, setArticles] = useState<Article[] | undefined>(undefined);

  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState<boolean>(true);
  const { pagination } = useArticle();

  const { showNotification } = useNotificationProvider();

  const getArticle = async (id: string) => {
    try {
      const response = await getDetailArticle(id);
      if (response.isSuccess) {
        setArticle(response.data);
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
    } finally {
      setLoading(false);
    }
  };

  const handleGetOtherArticleByCategory = async (category: string) => {
    const response = await getArticleListAction(1, pagination.totalData);

    const filteredArticlesByCategory =
      response.data.data.filter((article) =>
        article.category.name.toLowerCase().includes(category.toLowerCase())
      ) ?? [];
    const topThreeArticles = filteredArticlesByCategory.slice(0, 3);
    setArticles(topThreeArticles);
  };

  useEffect(() => {
    if (id) {
      getArticle(id);
    }
  }, [id]);

  useEffect(() => {
    if (article) {
      handleGetOtherArticleByCategory(article?.category.name ?? "");
    }
  }, [article]);

  return {
    t,
    categories,
    categoryOptions,
    article,
    articles,

    loading,
  };
};
