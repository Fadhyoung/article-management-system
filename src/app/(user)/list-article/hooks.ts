"use client";

import { useTranslations } from "next-intl";
import { useCategoryProvider } from "@/providers/CategoryProvider";
import { filterForm } from "@/types/Category";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useArticle } from "@/providers/ArticleProvider";
import { useEffect } from "react";
import getArticleListAction from "@/actions/article";
import { useNotificationProvider } from "@/providers/NotificationProvider";

export const useListArticle = () => {
  const t = useTranslations("ListArticles");
  const { categories, categoryOptions } = useCategoryProvider();
  const { showNotification } = useNotificationProvider();
  const router = useRouter();

  const { pagination, setPagination, articles, getArticles, setArticles } =
    useArticle();

  const { control } = useForm<filterForm>();

  const handlePageClick = async (page: number) => {
    try {
      const response = await getArticleListAction(page, pagination.dataPerPage);

      if (response.isSuccess) {
        setArticles(response.data.data);
        setPagination({
          ...pagination,
          currentPage: page,
          totalData: response.data.totalData,
          totalPages: Math.ceil(
            response.data.totalData / pagination.dataPerPage
          ),
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

  const handlePrevious = async () => {
    if (pagination.currentPage > 1) {
      const newPage = pagination.currentPage - 1;
      const response = await getArticleListAction(newPage, pagination.dataPerPage);
  
      if (response.isSuccess) {
        setArticles(response.data.data);
        setPagination({
          ...pagination,
          currentPage: newPage,
          totalData: response.data.totalData,
          totalPages: Math.ceil(response.data.totalData / pagination.dataPerPage),
        });
      } else {
        showNotification({
          type: "error",
          message: response.message,
          mode: "toast",
        });
      }
    }
  };
  
  const handleNext = async () => {
    if (pagination.currentPage < (pagination.totalPages ?? 0)) {
      const newPage = pagination.currentPage + 1;
  
      const response = await getArticleListAction(newPage, pagination.dataPerPage);
  
      if (response.isSuccess) {
        setArticles(response.data.data);
        setPagination({
          ...pagination,
          currentPage: newPage,
          totalData: response.data.totalData,
          totalPages: Math.ceil(response.data.totalData / pagination.dataPerPage),
        });
      } else {
        showNotification({
          type: "error",
          message: response.message,
          mode: "toast",
        });
      }
    }
  };
  

  const goToDetailArticle = (id: string) => {
    router.push(`/article/${id}`);
  };

  useEffect(() => {
    getArticles();
  }, []);

  console.log("pagination ", pagination);

  return {
    pagination,
    setPagination,
    t,
    router,
    control,
    categories,
    categoryOptions,
    articles,
    goToDetailArticle,
    handlePageClick,
    handleNext,
    handlePrevious,
  };
};
